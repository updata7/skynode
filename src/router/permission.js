import Joi from 'joi'
import { pagingSchema, cudListSchema } from './schema'
import permissionHandler from '../handler/permissionHandler'

export default [
    {
        meta: {
            swagger: {
                summary: '获取所有接口',
                description: '',
                tags: ['权限']
            }
        },
        path: '/permission/list',
        method: 'GET',
        auth: true,
        validate: {
            query: Joi.object({
            }).keys(pagingSchema.request),
            output: cudListSchema
        },
        handler: permissionHandler.search
    }
]