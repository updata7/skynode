import Joi from 'joi'
import { mongoIdSchema, cudResultSchema, pagingSchema, cudListSchema } from './schema'
import advertisementHandler from '../handler/advertisementHandler'

export default [
    {
        meta: {
            swagger: {
                summary: '获取广告列表',
                description: '',
                tags: ['广告管理']
            }
        },
        path: '/advertisement/list',
        method: 'GET',
        auth: true,
        validate: {
            query: Joi.object({
            }).keys(pagingSchema.request),
            output: cudListSchema
        },
        handler: advertisementHandler.search
    },
    {
        meta: {
            swagger: {
                summary: '添加广告',
                description: '',
                tags: ['广告管理']
            }
        },
        path: '/advertisement/create',
        method: 'POST',
        auth: true,
        validate: {
            body: Joi.object({
                image_url: Joi.string().trim().required().description('图片链接'),
                goods_id: mongoIdSchema.description('关联商品id'),
                link_type: Joi.number().required().default(0).description('关联商品类型，0 for 商品，1 for 链接'),
                link_url: Joi.string().description('关联链接'),
                end_time: Joi.date().description('结束时间'),
                sort: Joi.number().description('排序'),
                status: Joi.boolean().description('状态')
            }),
            output: cudResultSchema
        },
        handler: advertisementHandler.create
    },
    {
        meta: {
            swagger: {
                summary: '更新广告',
                description: '',
                tags: ['广告管理']
            }
        },
        path: '/advertisement/update',
        method: 'POST',
        auth: true,
        validate: {
            body: Joi.object({
                id: mongoIdSchema.required().description('记录id'),
                image_url: Joi.string().trim().description('图片链接'),
                goods_id: mongoIdSchema.description('关联商品id'),
                link_type: Joi.number().default(0).description('关联商品类型，0 for 商品，1 for 链接'),
                link_url: Joi.string().description('关联链接'),
                end_time: Joi.date().description('结束时间'),
                sort: Joi.number().description('排序'),
                status: Joi.boolean().description('状态')
            }),
            output: cudResultSchema
        },
        handler: advertisementHandler.update
    },
    {
        meta: {
            swagger: {
                summary: '删除广告',
                description: '',
                tags: ['广告管理']
            }
        },
        path: '/advertisement/delete',
        method: 'PUT',
        auth: true,
        validate: {
            body: Joi.object({
                ids: Joi.array().description('记录id数组')
            }),
            output: cudResultSchema
        },
        handler: advertisementHandler.delete
    }
]