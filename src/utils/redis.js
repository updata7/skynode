import Ioredis from 'ioredis'
import Config from 'config'

class Redis {
    init(config) {
        console.log("init redis......")
        this.redis = new Ioredis(config);
    }

    async set(key, value, timeout) {
        await this.redis.set(key, value)
        timeout = timeout || Config.redis.expir
        logger.debug('set redis timeout ==> ', timeout)
        await this.redis.expire(key, timeout)
    }

    async get(key) {
        const res = await this.redis.get(key)
        return res
    }
}

export default new Redis()