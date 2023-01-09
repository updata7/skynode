import Joi from 'joi'
import goodsSpecHandler from '../handler/goodsSpecHandler'
import { mongoIdSchema, cudResultSchema, pagingSchema, cudListSchema } from './schema'
export default [
    {
        meta: {
            swagger: {
                summary: '新建商品型号',
                description: '',
                tags: ['商品型号']
            }
        },
        path: '/goodsSpec/create',
        method: 'POST',
        auth: true,
        validate: {
            body: Joi.object({
                name: Joi.string().trim().required().description('型号名称'),
                sort: Joi.number().required().description('排序')
            }),
            output: cudResultSchema
        },
        handler: goodsSpecHandler.create
    },
    {
        meta: {
            swagger: {
                summary: '更新型号',
                description: '',
                tags: ['商品型号']
            }
        },
        path: '/goodsSpec/update',
        method: 'POST',
        auth: true,
        validate: {
            body: Joi.object({
                id: mongoIdSchema.required().description('记录ID'),
                name: Joi.string().trim().description('型号名称'),
                sort: Joi.number().description('排序')
            }),
            output: cudResultSchema
        },
        handler: goodsSpecHandler.update
    },
    {
        meta: {
          swagger: {
            summary: '商品型号列表',
            description: '',
            tags: ['商品型号']
          }
        },
        path: '/goodsSpec/list',
        method: 'GET',
        auth: true,
        validate: {
            query: Joi.object({
                isLoadAll: Joi.boolean().description('是否加载所有').default(false),
                name: Joi.string().description('型号名称')
            }).keys(pagingSchema.request),
            output: cudListSchema
        },
        handler: goodsSpecHandler.search
    },
    {
        meta: {
            swagger: {
                summary: '删除商品型号',
                description: '',
                tags: ['商品型号']
            }
        },
        path: '/goodsSpec/delete',
        method: 'PUT',
        auth: true,
        validate: {
            body: Joi.object({
                ids: Joi.array().description('记录id数组')
            }),
            output: cudResultSchema
        },
        handler: goodsSpecHandler.delete
    }
]