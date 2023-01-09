import Joi from 'joi'
import goodsCategoryHandler from '../handler/goodsCategoryHandler'
import { mongoIdSchema, cudResultSchema, pagingSchema, cudListSchema } from './schema'
export default [
    {
        meta: {
            swagger: {
                summary: '新建商品分类',
                description: '',
                tags: ['商品分类']
            }
        },
        path: '/goodsCategory/create',
        method: 'POST',
        auth: true,
        validate: {
            body: Joi.object({
                name: Joi.string().trim().required().description('分类名称'),
                isIconShow: Joi.boolean().description('图标显示'),
                isHomepageShow: Joi.boolean().description('首页显示'),
                isAllShow: Joi.boolean().description('全部产品页面显示'),
                iconUrl: Joi.string().allow(['']).description('图标路径'),
                imgUrl: Joi.string().allow(['']).description('图片路径'),
                height: Joi.number().description('图片高度'),
                sort: Joi.number().required().description('排序'),
                brief: Joi.string().allow(['']).description('简介'),
            }),
            output: cudResultSchema
        },
        handler: goodsCategoryHandler.create
    },
    {
        meta: {
            swagger: {
                summary: '更新分类',
                description: '',
                tags: ['商品分类']
            }
        },
        path: '/goodsCategory/update',
        method: 'POST',
        auth: true,
        validate: {
            body: Joi.object({
                id: mongoIdSchema.required().description('记录ID'),
                name: Joi.string().trim().description('分类名称'),
                isIconShow: Joi.boolean().description('图标显示'),
                isHomepageShow: Joi.boolean().description('首页显示'),
                isAllShow: Joi.boolean().description('全部产品页面显示'),
                iconUrl: Joi.string().allow(['']).description('图标路径'),
                imgUrl: Joi.string().allow(['']).description('图片路径'),
                height: Joi.number().description('图片高度'),
                sort: Joi.number().description('排序'),
                brief: Joi.string().allow(['']).description('简介'),
            }),
            output: cudResultSchema
        },
        handler: goodsCategoryHandler.update
    },
    {
        meta: {
          swagger: {
            summary: '商品分类列表',
            description: '',
            tags: ['商品分类']
          }
        },
        path: '/goodsCategory/list',
        method: 'GET',
        auth: true,
        validate: {
            query: Joi.object({
                isLoadAll: Joi.boolean().description('是否加载所有').default(false),
                name: Joi.string().description('分类名称')
            }).keys(pagingSchema.request),
            output: cudListSchema
        },
        handler: goodsCategoryHandler.search
    },
    {
        meta: {
            swagger: {
                summary: '删除商品分类',
                description: '',
                tags: ['商品分类']
            }
        },
        path: '/goodsCategory/delete',
        method: 'PUT',
        auth: true,
        validate: {
            body: Joi.object({
                ids: Joi.array().description('记录id数组')
            }),
            output: cudResultSchema
        },
        handler: goodsCategoryHandler.delete
    }
]