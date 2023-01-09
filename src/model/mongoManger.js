import Config from 'config'
import { assert } from 'utils/error'
import mongoose from 'mongoose'

const mConfig = Config.mongodb
// mongoose.set('useFindAndModify', false)
// mongoose.set('useNewUrlParser', true)
class MongoManger {
    constructor() {
        console.log('mongoManger constructor')
        mongoose.Promise = global.Promise // http://mongoosejs.com/docs/promises.html
        this.connect()
    }

    addEventListener() {
        this.connection.on("connected", () => {
            logger.info(`db connected: ${mConfig.uri}/${mConfig.dbname}`)
        })
        this.connection.on('error', (err) => {
            logger.error('connect db failed: ', err)
            process.exit(1)
        })
        this.connection.on('disconnected', () => {
            logger.warn('===> db disconnected')
        })
    }
    connect() {
        this.connection = mongoose.createConnection(`${mConfig.uri}/${mConfig.dbname}`, this.getOptions())
        this.addEventListener()
    }
    getOptions() {
        return {
            connectTimeoutMS: 10000,
            keepAlive: true,
            autoIndex: false,
            maxPoolSize: 10,   // 默认为5
            minPoolSize: 2,     // 最小连接数
            useNewUrlParser: true
        }
    }

    addModel(modelName, schema) {
        assert(!(modelName && schema), "modelName and schema cant be null")
        assert(!this.connection, "请先连接数据库")
        if (!this.connection.models[modelName]) {
            this.connection.model(modelName, schema)
            console.log(`addModel success: ${modelName}`)
        }

        return this.connection.models[modelName]
    }
}

export default new MongoManger()