import path from 'path'
import Koa from 'koa'
import Config from 'config'
import resource from 'koa-static'
import { getAuthentication } from 'middleware/authentication'
import { getAllRouters } from 'middleware/router'
import { logRequest, handleExceptionStatus, setResponseHeader, cors } from 'middleware'
import { koaBody } from 'koa-body'
import { getWxAccessToken } from './utils/wx'
// import userModel from './model/userModel'
const getSwagger = require('middleware/swagger')
const initEnv = require('./utils/initEnv')

// 添加中间组件,注意各组件间的顺序
function addMiddlewares(app) {
    app.use(koaBody({
        'formLimit': '50mb',
        'jsonLimit': '50mb',
        'textLimit': '50mb'
    }))
    const middlewares = [logRequest, cors, setResponseHeader, handleExceptionStatus]
    const { routers } = getAllRouters({ directories: [path.join('src/router')], excludePaths: ["test.js", "schema.js"] })
    const authorization = getAuthentication(routers)
    middlewares.push(authorization)
    middlewares.push(routers.middleware())

    // 静态资源
    const serveStatic = resource(path.join(__dirname, '../public/front'), { defer: false, index: 'index.html' })
    middlewares.push(serveStatic)

    const serveStatic2 = resource(path.join(__dirname, '../running'), { maxage: 30 * 24 * 60 * 60 * 1000 })
    middlewares.push(serveStatic2)

    // api文档 http://localhost:9011/api/docs
    const { swaggerRouter, swaggerUI } = getSwagger(routers)
    middlewares.push(swaggerRouter.middleware())
    middlewares.push(swaggerUI)

    middlewares.forEach(item => app.use(item))
}

function addEventListener (app) {
    app.on('error', err => {
        logger.error('APP未知错误', err)
        process.exit(1)
    })
    process.on('uncaughtException', err => {
        logger.error('uncaughtException', err)
        process.exit(1)
    })
    process.on('unhandledRejection', err => {
        logger.error('unhandledRejection', err)
        process.exit(1)
    })

    process.on('SIGINT', async function () {
        logger.info('main process get SIGINT sign')
        await mongoose.disconnect(() => {
            console.log('mongo disconnect')
        })
        process.exit(0)
    })

    process.on('beforeExit', (code) => {
        logger.warn('beforeExit event with code: ', code);
    });
      
  
    process.on('SIGTERM', async () => {
        logger.warn('main process get SIGTERM sign')
        await mongoose.disconnect(() => {
            console.log('mongo disconnect')
        })
        process.exit(0)
    })
  
    process.on('exit', () => {
        logger.warn('main process get exit sign')
    })
}

export async function start() {
    initEnv()
    const app = new Koa()
    addEventListener(app)
    addMiddlewares(app)
    const port = Config.port
    app.listen(port, () => {
        logger.info(`
            Server is running!
            Local:   http://localhost:${port}
            Api Docs:   http://localhost:${port}/api/docs
        `)
        process.send('ready')
    })

    // 获取微信公众号accessToken
    // await getWxAccessToken()
}