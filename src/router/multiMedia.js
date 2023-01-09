// 多媒体
import multiMedialHanler from '../handler/multiMediaHandler'
import { koaBody } from 'koa-body'
const Joi = require('joi')

export default [
    {
        meta: {
            swagger: {
                summary: '文件上传（文本、图片、语音、视频等资源上传）',
                description: '文件上传，将资源放在FormData的files中',
                tags: ['多媒体']
            }
        },
        // auth: true,
        path: '/multiMedia/upload',
        method: 'POST',
        validate: {
            type: 'multipart/form-data',
            body: Joi.object({}).unknown(),
            output: Joi.object({
                paths: Joi.array().description('图片路径')
            })
        },
        handler: [koaBody({ multipart: true }), multiMedialHanler.upload]
    }
]
