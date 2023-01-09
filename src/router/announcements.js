import Joi from 'joi'
import { mongoIdSchema, cudResultSchema, pagingSchema, cudListSchema } from './schema'
import announcementsHandler from '../handler/announcementsHandler'

export default [
    {
        meta: {
            swagger: {
                summary: '获取公告列表',
                description: '',
                tags: ['公告管理']
            }
        },
        path: '/announcements/list',
        method: 'GET',
        auth: true,
        validate: {
            query: Joi.object({
            }).keys(pagingSchema.request),
            output: cudListSchema
        },
        handler: announcementsHandler.search
    },
    {
        meta: {
            swagger: {
                summary: '添加公告',
                description: '',
                tags: ['公告管理']
            }
        },
        path: '/announcements/create',
        method: 'POST',
        auth: true,
        validate: {
            body: Joi.object({
                content: Joi.string().trim().required().description('公告内容'),
                start_time: Joi.date().description('开始时间'),
                end_time: Joi.date().description('结束时间'),
            }),
            output: cudResultSchema
        },
        handler: announcementsHandler.create
    },
    {
        meta: {
            swagger: {
                summary: '更新商品',
                description: '',
                tags: ['公告管理']
            }
        },
        path: '/announcements/update',
        method: 'POST',
        auth: true,
        validate: {
            body: Joi.object({
                id: mongoIdSchema.required().description('记录id'),
                content: Joi.string().trim().required().description('公告内容'),
                start_time: Joi.date().description('开始时间'),
                end_time: Joi.date().description('结束时间')
            }),
            output: cudResultSchema
        },
        handler: announcementsHandler.update
    },
    {
        meta: {
            swagger: {
                summary: '删除公告',
                description: '',
                tags: ['公告管理']
            }
        },
        path: '/announcements/delete',
        method: 'PUT',
        auth: true,
        validate: {
            body: Joi.object({
                ids: Joi.array().description('记录id数组')
            }),
            output: cudResultSchema
        },
        handler: announcementsHandler.delete
    }
]