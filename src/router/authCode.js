import Joi from 'joi'
import { mongoIdSchema, cudResultSchema, pagingSchema } from './schema'
export default [
    {
        meta: {
            swagger: {
                summary: '修改记录',
                description: '',
                tags: ['学员管理']
            }
        },
        path: '/authCode/search',
        method: 'GET',
        auth: true,
        validate: {
            query: Joi.object({
                label: Joi.string().trim().description('标签'),
                type: Joi.string().trim().description('类型'),
                authCode: Joi.string().trim().description('授权码')
            }).keys(pagingSchema.request),
            output: {
                records: Joi.array(),
                totalCount: Joi.number().description('总数')
            }
        },
        handler: async (ctx) => {
            logger.info("handler ====> ", ctx.query)
            ctx.body = "hello, world"
        }
    }
]