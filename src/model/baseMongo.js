import moment from 'moment'
import mongoManger from './mongoManger'
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import Config from 'config'

const prefix = Config.mongodb.prefix || ''
// api https://mongoosejs.com/docs/5.x/docs/guide.html
export default class BaseMongo {
  constructor (modelName, schema) {
    this.model = mongoManger.addModel(prefix + modelName, schema)
    try {
      const dataArr = require(`../../database/mongo/${modelName}`)
      const file = path.join(__dirname, '../../lock/', `mongo_${modelName}.lock`)
      fs.access(file, fs.constants.F_OK, (err) => {
        try {
          if (err) {
            // 不存在lock文件，就初始化数据
            console.debug('init data ==> ', modelName, dataArr)
            this.create(dataArr)
            fs.writeFile(file, "inited", (wErr) => {
              if (wErr) {
                console.debug(`write lock ==> ${file} failed`)
              }
            })
          } else {
            // exists, nothing to do
          }
        } catch (err2) {
          console.log('operate file error ==> ', err2)
        }
      });
    } catch (err) {
      // 不需要初始化数据的
      // console.debug('err => ', modelName)
    }
  }

  async create (docOrDocs) {
    try {
      const doc = await this.model.create(docOrDocs)
      // console.debug('create res doc ===>', doc, docOrDocs instanceof Array)
      if (docOrDocs instanceof Array) return formatDocs(doc)

      return formatDoc(doc.toJSON())
    } catch (e) {
      logger.error("baseMongo create ==> ", e)
    }
  }

  // 获取列表 分页
  async list(query, options, lookupArr) {
    const { pageNo, pageSize, sortField, sortOrder, isLoadAll } = options
    let skip = (pageNo - 1) * pageSize
    let limit = pageSize
    const pageOptions = {}
    if (sortField) {
      pageOptions.sort = { [sortField]: sortOrder }
    }
    if (!isLoadAll) {
      pageOptions.limit = limit
      pageOptions.skip = skip
    }

    let data
    if (!_.isEmpty(lookupArr)) {
      const pipelines = []
      lookupArr.map(r => pipelines.push({ $lookup: r }))
      if (!_.isEmpty(query)) {
        pipelines.push({ $match: query })
      }
      if (pipelines.sort) {
        pipelines.push({ $sort: { [sortField]: sortOrder === 'asc' ? -1: 1 }})
      }
      if (pageOptions.limit) {
        pipelines.push({ $limit: limit })
      }
      if (pageOptions.skip) {
        pipelines.push({ $skip: skip })
      }
      data = await this.aggregate(pipelines)
    } else {
      data = await this.find(query, null, pageOptions)
    }
    
    const total = await this.countDocuments(query)

    return { data, total }
  }
  async find (conditions, projection, options) {
    if (conditions.id) {
      conditions._id = conditions.id
      delete conditions.id
    }
    if (!projection) {
      projection = ' -__v'
    }

    if (options && options.sort) {
      Object.keys(options.sort).forEach((key) => {
        if (options.sort[key] === 'desc') {
          options.sort[key] = -1
        } else {
          options.sort[key] = 1
        }
      })
    }
    let items = await this.model.find(conditions, projection, options).lean()
    items = items.map(item => formatDoc(item))
    return items
  }

  async findById (id, projection, options) {
    const doc = await this.findOne({ _id: id }, projection, options)
    return formatDoc(doc)
  }

  async findOne (conditions, projection, options) {
    if (!projection) {
      projection = ' -__v'
    }
    if (options && options.sort) {
      Object.keys(options.sort).forEach((key) => {
        if (options.sort[key] === 'desc') {
          options.sort[key] = -1
        } else {
          options.sort[key] = 1
        }
      })
    }
    let item = await this.model.findOne(conditions, projection, options).lean()
    if (item) {
      const { _id, ...other } = item
      item = { id: _id.toString(), ...other }
    }
    return item
  }

  estimatedDocumentCount (conditions) {
    return this.model.estimatedDocumentCount(conditions)
  }

  countDocuments (conditions) {
    return this.model.count(conditions)
  }

  updateOne (condition, doc, options) {
    return this.model.updateOne(condition, doc, options)
  }

  /**
   * 
   * @param {*} id 
   * @param {*} doc 
   * @param {*} options 
   * @returns { acknowledged: true, modifiedCount: 1, upsertedId: null, upsertedCount: 0, matchedCount: 1 }
   */
  updateById(id, doc, options) {
    return this.model.updateOne({ _id: id }, doc, options)
  }

  updateMulti (conditions, doc, options) {
    return this.model.updateMany(conditions, doc, options)
  }

  async findByIdAndUpdate (id, update, options) {
    const doc = await this.model.findByIdAndUpdate(id, update, { new: true, ...options })
    return formatDoc(doc.toJSON())
  }

  async findByIdAndRemove (id, options) {
    let item = await this.model.findByIdAndRemove(id, options)
    if (item) {
      const { _id, ...other } = item
      item = { id: _id.toString(), ...other }
    }
    return item
  }

  findOneAndUpdate (conditions, doc, options) {
    return this.model.findOneAndUpdate(conditions, doc, options)
  }

  async findOneAndRemove (conditions, options) {
    let item = await this.model.findOneAndRemove(conditions, options).lean()
    if (item) {
      const { _id, ...other } = item
      item = { id: _id.toString(), ...other }
    }
    return item
  }

  async aggregate (pipelines) {
    const res = await this.model.aggregate(pipelines)
    return formatDocs(res)
  }

  async existId (id) {
    const item = await this.findById(id, 'id')
    return !!item && !!item.id
  }

  async existOne (condition) {
    const { id } = condition
    if (id) {
      condition._id = id
      delete condition.id
    }
    const item = await this.findOne(condition, 'id')
    return !!item && !!item.id
  }

  // unexpectArr 不希望被删数据的coll数组
  async allCollectionsRemove(query, unexpectArr = []) {
    for (let collName in this.model.db.collections) {
      if (unexpectArr.indexOf(collName) <= -1) {
        const collInfo = this.model.db.collections[collName]
        await collInfo.remove(query)
      }
    }
  }

  async allCollectionsUpdate(query, condition, options) {
    for (let collName in this.model.db.collections) {
      if (collName !== 'users') {
        const collInfo = this.model.db.collections[collName]
        // console.log('===>>> ', collName, collInfo)
        await collInfo.update(query, condition, options)
      }
    }
  }

  // 检查表是否存在
  async checkIsColExists() {
    return this.model.db.collections[this.model.collection.name]
  }

  async drop() {
    if (!this.checkIsColExists()) return
    await this.model.collection.drop()
  }

  /**
   * 
   * @param {*} condition 
   * @returns { acknowledged: true, deletedCount: 1 }
   */
  async remove (condition) {
    const res = await this.model.deleteMany(condition)
    return res
  }

  removeById (id) {
    return this.model.deleteOne({ _id: id })
  }
}

function formatDoc (jsonDoc) {
  if (jsonDoc) {
    if (typeof jsonDoc === "string") {
      return jsonDoc
    }

    const isArray = Array.isArray(jsonDoc)
    const { id, _id, __v, ...other } = jsonDoc
    for (const key in other) {
      if (other[key] instanceof Date) {
        other[key] = moment(other[key]).format("YYYY-MM-DD HH:mm:ss")
      } else if (other[key] instanceof Array) {
        other[key] = formatDocs(other[key])
      } else if (other[key] instanceof Object && !(other[key] instanceof mongoose.Types.ObjectId)) {
        other[key] = formatDoc(other[key])
      }
    }
    if (id || _id) {
      return { id: id || _id.toString(), ...other }
    }

    if (isArray) {
      return Object.values(other)
    }

    return other
  }
  return jsonDoc
}

function formatDocs(docs) {
  return docs.map(doc => {
    return formatDoc(doc)
  })
}
