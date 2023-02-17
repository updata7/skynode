import fs from 'fs'
import path from 'path'
import md5 from 'md5'
import jwt from 'jsonwebtoken'
import Config from 'config'
import _ from 'lodash'
import bunyan from 'bunyan'
import redis from './redis'
import { name } from '../../package.json'
import sha1 from "sha1"
import xml2js from 'xml2js';

/**
 * 获取制定目录下的绝对路径
 * @param {文件夹} directorys 
 * @param {后缀} suffix 
 * @returns 
 */
export function getAllFilePaths(directorys, suffix = ".js") {
    const filePaths = []
    directorys.forEach(curDir => {
        const names = fs.readdirSync(curDir)
        names.forEach(name => {
            const absolutePath = path.resolve(curDir, name)
            if (name.endsWith(suffix)) {
                filePaths.push(path.resolve(curDir, name))
            } else if (fs.statSync(absolutePath).isDirectory()) {
                const subFilePaths = getAllFilePaths(absolutePath)
                filePaths.push(...subFilePaths)
            }
        })
    })
    return filePaths
}

export function removeKey(arr, keyArr) {
    arr.map(a => {
        keyArr.map(k => {
            if (a[k]) delete a[k]
        })
        if (a.children && a.children.length > 0) {
            removeKey(a.children, keyArr)
        }
    })
}

export function removeUndefinedKey(obj, removeNull = true) {
    if (obj) {
        Object.keys(obj).forEach(key => {
            if (typeof obj[key] === 'undefined') {
                delete obj[key]
            }
            if (removeNull && obj[key] === null) {
                delete obj[key]
            }
        })
    }
    return obj
}

/**
 * 
 * @param {密码明文} password 
 * @param {密钥} salt 
 * @returns 
 */
export function getSaltedPassword(password, salt) {
    return md5(password + salt)
}

/**
 * 生产token
 * @param {用户数据, id, account} options
 */
export function genToken(options) {
    const vCode = md5(Object.values(options).join(':'))
    const tokenObj = { 
        ...options,
        vCode
    }
    const { secretKey, expiresIn, algorithm } = Config.jwt
    const token = jwt.sign(tokenObj, secretKey, { expiresIn, algorithm })
    return token
}

/**
 * 验证token并返回生成token时的options
 * @param {*} token 
 */
export function verifyToken(token) {
    const { secretKey, expiresIn, algorithm } = Config.jwt
    const tokenObj = jwt.verify(token, secretKey, { expiresIn, algorithm })
    return tokenObj
}

const appSecret = '206e31a481bf11e9927fa7f13b47f3b0'
export function getSign(signParam) {
    const list = Object.keys(signParam).sort();
    let str = appSecret;
    list.forEach(function (v, k) {
        if (typeof signParam[v] === 'object') {
            signParam[v] = JSON.stringify(signParam[v]);
        }
        str += v + signParam[v];
    });
    str += appSecret;
    const ret = md5(str)
    //   console.debug('getSign ==> ', ret.toUpperCase(), str)
    return ret.toUpperCase();
}

export function getTokenCacheKey(account, platForm) {
    return `userToken:${account}`
}

async function _saveFileHelper(filePath, name, type) {
    let dirname = 'voice'
    if (type.indexOf('image') > -1) {
        dirname = 'image'
    } else if (type.indexOf('text') > -1) {
        dirname = 'txt'
    } else if (type.indexOf('json') > -1) {
        dirname = 'json'
    } else if (type.indexOf('excel') > -1 || type.indexOf('sheet') > -1) {
        dirname = 'excel'
    }

    const fileExists = await fs.existsSync(path.join(__dirname, '../..', `running/${dirname}`))
    if (!fileExists) {
        const dirExists = await fs.existsSync(path.join(__dirname, '../..', `running`))
        if (!dirExists) {
            await fs.mkdirSync(path.join(__dirname, '../..', `running`))
        }
        await fs.mkdirSync(path.join(__dirname, '../..', `running/${dirname}`))
    }

    return new Promise((resolve) => {
        const filename = `${new Date().getTime()}_${Math.floor(Math.random() * 1000000)}`
        const relativePath = `${dirname}/${md5(filename)}.${name.split('.')[1]}`
        const newFilePath = path.join(__dirname, '../..', `running/${relativePath}`)
        const readStream = fs.createReadStream(filePath)
        const writeStream = fs.createWriteStream(newFilePath)
        readStream.on('data', function (data) {
            writeStream.write(data)
        })
        readStream.on('close', function () {
            resolve(relativePath)
        })
    })
}
// 保存文件
export async function saveFiles(files) {
    if (!Array.isArray(files)) files = [files]
    const paths = []
    await Promise.all(files.map(async (file) => {
        logger.info('file ==> ', file)
        let path = await _saveFileHelper(file.filepath, file.originalFilename, file.mimetype)
        paths.push(path)
    }))
    return paths
}

// 清除缓存角色权限
export async function clearRolePermCache(role) {
    await redis.set(`role:${role}`, null)
}


export function wxGetSignature(timestamp, nonce, token) {
    let arr = [token, timestamp, nonce]
    let res = sha1(arr.sort().join(''))
    return res
}

/*!
 * 将xml2js解析出来的对象转换成直接可访问的对象
 */
function formatMessage(result) {
    var message = {};
    if (typeof result === 'object') {
      for (var key in result) {
        if (!(result[key] instanceof Array) || result[key].length === 0) {
          continue;
        }
        if (result[key].length === 1) {
          var val = result[key][0];
          if (typeof val === 'object') {
            message[key] = formatMessage(val);
          } else {
            message[key] = (val || '').trim();
          }
        } else {
          message[key] = result[key].map(function (item) {
            return formatMessage(item);
          });
        }
      }
    }
    return message;
}

export function parseXML(xml) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xml, {trim: true}, function (err, obj) {
            if (err) {
                return reject(err);
            }
    
            resolve(formatMessage(obj.xml));
        });
    });
}