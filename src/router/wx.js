// 微信公众号

import Joi from 'joi'
import wxHandler from '../handler/wxHandler'
import { cudResultSchema } from './schema'

export default [
    {
        meta: {
            swagger: {
                summary: '公众号回调API',
                description: '',
                tags: ['微信公众号']
            }
        },
        path: '/wx/officialAccount',
        method: ['GET', 'POST'],
        validate: {
            // query: Joi.object({
            //     signature: Joi.string().description("微信加密签名，signature结合了开发者填写的 token 参数和请求中的 timestamp 参数、nonce参数。"),
            //     timestamp: Joi.string().description("时间戳"),
            //     nonce: Joi.string().description("随机数"),
            //     echostr: Joi.string().description("随机字符串")
            // }),
            query: Joi.any(),
            output: Joi.string().allow("").description("结果")
        },
        handler: wxHandler.officialAccount
    }
]