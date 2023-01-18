import Joi from 'joi'
import { mongoIdSchema, cudResultSchema, pagingSchema, cudListSchema } from './schema'
import areaHandler from '../handler/areaHandler'

export default [
    {
        meta: {
            swagger: {
                summary: '获取全国省份',
                description: '',
                tags: ['地区']
            }
        },
        path: '/area/province',
        method: 'GET',
        auth: true,
        validate: {
            query: Joi.object({}),
            output: cudListSchema
        },
        handler: areaHandler.getProvince
    }
]