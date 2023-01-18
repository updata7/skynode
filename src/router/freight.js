import Joi from 'joi'
import { mongoIdSchema, cudResultSchema, pagingSchema, cudListSchema, cudObjectSchema, cudTimeSchema } from './schema'
import freightHandler from '../handler/freightHandler'

export default [
    {
        meta: {
            swagger: {
                summary: '获取运费模板列表',
                description: '',
                tags: ['运费模板']
            }
        },
        path: '/freight/list',
        method: 'GET',
        auth: true,
        validate: {
            query: Joi.object({
            }).keys(pagingSchema.request),
            output: cudListSchema
        },
        handler: freightHandler.search
    },
    {
        meta: {
            swagger: {
                summary: '获取运费模板列表',
                description: '',
                tags: ['运费模板']
            }
        },
        path: '/freight/getOne',
        method: 'GET',
        auth: true,
        validate: {
            query: Joi.object({
                id: mongoIdSchema.required().description('记录id'),
            }).keys(pagingSchema.request),
            output: cudObjectSchema
        },
        handler: freightHandler.getOne
    },
    {
        meta: {
            swagger: {
                summary: '添加运费模板',
                description: '',
                tags: ['运费模板']
            }
        },
        path: '/freight/create',
        method: 'POST',
        auth: true,
        validate: {
            body: Joi.object({
                name: Joi.string().trim().required().description('模板名称'),
                charge_type: Joi.number().required().description('付费类型 0 for 自定义邮费 1 for 卖家承担运费'),
                freight_type: Joi.number().description('收费类型 0 for 按件计费 1 for 按重计费'),
                start: Joi.number().description('首件或首重'),
                start_fee: Joi.number().description('首件或首重 运费'),
                add: Joi.number().description('添加多少件（个）或重量（kg）'),
                add_fee: Joi.number().description('每添加多少件（个）或重量（kg）的费用'),
                areas: Joi.array().description('指定地区运费').items(Joi.object({
                    id: mongoIdSchema.description('记录id，新增时没有此字段'),
                    codes: Joi.array().description('区域代码'),
                    start: Joi.number().required().description('首件或首重'),
                    start_fee: Joi.number().required().description('首件或首重 运费'),
                    add: Joi.number().required().description('添加多少件（个）或重量（kg）'),
                    add_fee: Joi.number().required().description('每添加多少件（个）或重量（kg）的费用'),
                })),
                not_delivery_areas: Joi.array().description("不配送区域").items(Joi.object({
                    id: mongoIdSchema.description('记录id，新增时没有此字段'),
                    codes: Joi.array().description('区域代码'),
                }))
            }),
            output: cudResultSchema
        },
        handler: freightHandler.create
    },
    {
        meta: {
            swagger: {
                summary: '更新记录',
                description: '',
                tags: ['运费模板']
            }
        },
        path: '/freight/update',
        method: 'POST',
        auth: true,
        validate: {
            body: Joi.object({
                id: mongoIdSchema.required().description('记录id'),
                name: Joi.string().trim().required().description('模板名称'),
                charge_type: Joi.number().required().description('付费类型 0 for 自定义邮费 1 for 卖家承担运费'),
                freight_type: Joi.number().description('收费类型 0 for 按件计费 1 for 按重计费'),
                start: Joi.number().description('首件或首重'),
                start_fee: Joi.number().description('首件或首重 运费'),
                add: Joi.number().description('添加多少件（个）或重量（kg）'),
                add_fee: Joi.number().description('每添加多少件（个）或重量（kg）的费用'),
                areas: Joi.array().description('指定地区运费').items(Joi.object({
                    id: mongoIdSchema.description('记录id，新增时没有此字段'),
                    freight_id: mongoIdSchema.description('运费模板的记录id'),
                    codes: Joi.array().description('区域代码'),
                    start: Joi.number().required().description('首件或首重'),
                    start_fee: Joi.number().required().description('首件或首重 运费'),
                    add: Joi.number().required().description('添加多少件（个）或重量（kg）'),
                    add_fee: Joi.number().required().description('每添加多少件（个）或重量（kg）的费用'),
                    ...cudTimeSchema
                })),
                not_delivery_areas: Joi.array().description("不配送区域").items(Joi.object({
                    id: mongoIdSchema.description('记录id，新增时没有此字段'),
                    codes: Joi.array().description('区域代码'),
                }))
            }),
            output: cudResultSchema
        },
        handler: freightHandler.update
    },
    {
        meta: {
            swagger: {
                summary: '删除记录',
                description: '',
                tags: ['运费模板']
            }
        },
        path: '/freight/delete',
        method: 'PUT',
        auth: true,
        validate: {
            body: Joi.object({
                ids: Joi.array().description('记录id数组')
            }),
            output: cudResultSchema
        },
        handler: freightHandler.delete
    }
]