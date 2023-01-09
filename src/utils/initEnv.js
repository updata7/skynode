import bunyan from 'bunyan'
import redis from './redis'
import { name } from '../../package.json'
import Config from 'config'
import fs from 'fs'
import path from 'path'

module.exports = async (level) => {
    level = level || "debug"    // 设置为info时，debug的不显示
    global.logger = bunyan.createLogger({
        name,
        stream: process.stdout,
        level
    })
    redis.init(Config.redis)
    global.redis = redis

    const dirExists = await fs.existsSync(path.join(__dirname, '../..', `lock`))
    if (!dirExists) {
        await fs.mkdirSync(path.join(__dirname, '../..', `lock`))
    }
}