import Joi from 'joi'
import { cudResultSchema, mongoIdSchema } from './schema'
import goodsProductHandler from '../handler/goodsProductHandler'

export default [
    {
        meta: {
            swagger: {
                summary: '检查sku',
                description: '',
                tags: ['商品product']
            }
        },
        path: '/goodsProduct/check',
        method: 'POST',
        auth: true,
        validate: {
            body: Joi.object({
                sku: Joi.string().required().description('sku')
            }),
            output: cudResultSchema
        },
        handler: goodsProductHandler.check
    },
    {
        meta: {
            swagger: {
                summary: '更新product',
                description: '',
                tags: ['商品product']
            }
        },
        path: '/goodsProduct/update',
        method: 'POST',
        auth: true,
        validate: {
            body: Joi.object({
                id: mongoIdSchema.required().description('记录id'),
                sku: Joi.string().description('商品sku'),
                short_name: Joi.string().description('快递单上简称'),
                attr: Joi.string().description('型号或规格'),
                cost: Joi.number().description('成本'),
                retail: Joi.number().description('零售'),
                weight: Joi.number().description('重量 KG'),
                stock: Joi.number().description('库存'),
                sort: Joi.number().description('排序'),
                on_sale: Joi.number().description('0 for 上架，1 for 下架'),
            }),
            output: cudResultSchema
        },
        handler: goodsProductHandler.update
    },
    {
        meta: {
            swagger: {
                summary: '删除商品product',
                description: '',
                tags: ['商品product']
            }
        },
        path: '/goodsProduct/delete',
        method: 'PUT',
        auth: true,
        validate: {
            body: Joi.object({
                ids: Joi.array().description('记录id数组')
            }),
            output: cudResultSchema
        },
        handler: goodsProductHandler.delete
    }
]