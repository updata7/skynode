import koaCors from '@koa/cors'
import Config from 'config'

const corsOptions = {
    // origin: Config.get('isProduction') ? '*' : '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    maxAge: '86400', // 24 hours
    // credentials: true
}

export const cors = koaCors(corsOptions)