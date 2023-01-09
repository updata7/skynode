require('dotenv').config()

export default {
    port: process.env.PORT,
    apiPrefix: process.env.API_PREFIX,
    jwt: {
        algorithm: process.env.JWT_ALGORITHM,
        expiresIn: process.env.JWT_EXPIRESIN,
        secretKey: process.env.JWT_SECRETKEY
    },
    mongodb: {
        uri: process.env.MONGO_URI,
        dbname: process.env.MONGO_DBNAME,
        prefix: process.env.MONGO_PREFIX
    },
    mysql: {
        dbname: process.env.MYSQL_DBNAME,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        host: process.env.MYSQL_HOST,
        prefix: process.env.MYSQL_PREFIX
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        db: process.env.REDIS_DB,
        expir: process.env.REDIS_EXPIR
    }
}