import Joi from 'joi'
import { mongoIdSchema, cudResultSchema, pagingSchema, cudListSchema } from './schema'
import goodsHandler from '../handler/goodsHandler'

export default [
    {
        meta: {
            swagger: {
                summary: '获取商品列表',
                description: '',
                tags: ['商品']
            }
        },
        path: '/goods/list',
        method: 'GET',
        auth: true,
        validate: {
            query: Joi.object({
                name: Joi.string().trim().description('商品名称'),
                listType: Joi.string().trim().description('获取数据类型')
            }).keys(pagingSchema.request),
            output: cudListSchema
        },
        handler: goodsHandler.search
    },
    {
        meta: {
            swagger: {
                summary: '添加商品',
                description: '',
                tags: ['商品']
            }
        },
        path: '/goods/create',
        method: 'POST',
        auth: true,
        validate: {
            body: Joi.object({
                name: Joi.string().trim().required().description('商品名称'),
                category_id: Joi.string().trim().required().description('分类id'),
                show_pic_or_video: Joi.number().description('显示轮播图还是视频，1 for 轮播图 2 for 视频'),
                list_pic_url: Joi.array().description('轮播图url'),
                video_url: Joi.string().trim().description('视频url'),
                pic_url: Joi.string().trim().description('商品图片'),
                brief: Joi.string().trim().allow(['']).description('商品简介'),
                unit: Joi.string().trim().required().description('商品单位，如 件、包'),
                sales: Joi.number().required().description('显示 销量'),
                spec_id: Joi.string().required().description('型号和规格 id'),
                attr: Joi.number().required().description('属性，0 for普通，1 for 新品'),
                express_template_id: Joi.string().required().description('快递模板id'),
                detail: Joi.string().required().description('商品详情 富文本形式'),
                on_sale: Joi.number().required().description('0 for 上架，1 for 下架'),
                sort: Joi.number().required().description('排序'),
                products: Joi.array().required().description('产品').items(Joi.object({
                    id: mongoIdSchema.description('记录id，新增时没有此字段'),
                    sku: Joi.string().required().description('商品sku'),
                    short_name: Joi.string().required().description('快递单上简称'),
                    attr: Joi.string().required().description('型号或规格'),
                    cost: Joi.number().required().description('成本'),
                    retail: Joi.number().required().description('零售'),
                    weight: Joi.number().required().description('重量 KG'),
                    stock: Joi.number().required().description('库存'),
                    sort: Joi.number().required().description('排序')
                }))
            }),
            output: cudResultSchema
        },
        handler: goodsHandler.create
    },
    {
        meta: {
            swagger: {
                summary: '更新商品',
                description: '',
                tags: ['商品']
            }
        },
        path: '/goods/update',
        method: 'POST',
        auth: true,
        validate: {
            body: Joi.object({
                id: mongoIdSchema.required().description('记录id'),
                name: Joi.string().trim().description('商品名称'),
                category_id: Joi.string().trim().description('分类id'),
                show_pic_or_video: Joi.number().description('显示轮播图还是视频，1 for 轮播图 2 for 视频'),
                list_pic_url: Joi.array().description('轮播图url'),
                video_url: Joi.string().trim().description('视频url'),
                pic_url: Joi.string().trim().description('商品图片'),
                brief: Joi.string().trim().allow(['']).description('商品简介'),
                unit: Joi.string().trim().description('商品单位，如 件、包'),
                sales: Joi.number().description('显示 销量'),
                is_index: Joi.boolean().description('是否在首页显示'),
                spec_id: Joi.string().description('型号和规格 id'),
                attr: Joi.number().description('属性，0 for普通，1 for 新品'),
                express_template_id: Joi.string().description('快递模板id'),
                detail: Joi.string().description('商品详情 富文本形式'),
                on_sale: Joi.number().description('0 for 上架，1 for 下架'),
                sort: Joi.number().description('排序'),
                products: Joi.array().description('产品').items(Joi.object({
                    id: mongoIdSchema.description('记录id，新增时没有此字段'),
                    sku: Joi.string().description('商品sku'),
                    short_name: Joi.string().description('快递单上简称'),
                    attr: Joi.string().description('型号或规格'),
                    cost: Joi.number().description('成本'),
                    retail: Joi.number().description('零售'),
                    weight: Joi.number().description('重量 KG'),
                    stock: Joi.number().description('库存'),
                    sort: Joi.number().description('排序'),
                    on_sale: Joi.number().description('0 for 上架，1 for 下架'),
                }))
            }),
            output: cudResultSchema
        },
        handler: goodsHandler.update
    },
    {
        meta: {
            swagger: {
                summary: '删除商品',
                description: '',
                tags: ['商品']
            }
        },
        path: '/goods/delete',
        method: 'PUT',
        auth: true,
        validate: {
            body: Joi.object({
                ids: Joi.array().description('记录id数组')
            }),
            output: cudResultSchema
        },
        handler: goodsHandler.delete
    }
]