import Joi from 'joi'
import { userStatusValues } from '../dictionary/user'
import userHandler from '../handler/userHandler'
import { mongoIdSchema, cudResultSchema, pagingSchema, cudListSchema } from './schema'
import { userprojectRoles } from '../dictionary/user'

const projectRoles = [userprojectRoles.admin.value]     // 仅允许admin用户访问

export default [
    {
        meta: {
            swagger: {
                summary: '登录',
                description: '',
                tags: ['用户']
            }
        },
        path: '/user/login',
        method: 'POST',
        validate: {
            body: Joi.object({
                username: Joi.string().trim().required().description('标签').example('admin'),
                password: Joi.string().trim().required().description('类型').example('12345678'),
                vCode: Joi.string().trim().description('验证码')
            }),
            output: cudResultSchema.keys({
                token: Joi.string()
            })
        },
        handler: userHandler.login
    },
    {
        meta: {
            swagger: {
                summary: '新建用户',
                description: '',
                tags: ['用户']
            }
        },
        path: '/user/create',
        method: 'POST',
        auth: true,
        validate: {
            body: Joi.object({
                account: Joi.string().trim().required().description('用户帐号'),
                password: Joi.string().trim().required().description('密码'),
                role: Joi.string().trim().required().description('角色'),
                nickname: Joi.string().allow(['']).required().description('用户昵称'),
                mobile: Joi.string().allow(['']).description('号码'),
                email: Joi.string().allow(['']).description('邮箱'),
                introduction: Joi.string().allow(['']).description('简介或备注'),
                status: Joi.number().valid(userStatusValues).description('状态'),
            }),
            output: cudResultSchema
        },
        handler: userHandler.create
    },
    {
        meta: {
            swagger: {
                summary: '更新用户',
                description: '',
                tags: ['用户']
            }
        },
        path: '/user/update',
        method: 'POST',
        auth: true,
        validate: {
            body: Joi.object({
                id: mongoIdSchema.required().description('用户ID'),
                account: Joi.string().trim().description('用户帐号'),
                password: Joi.string().trim().description('密码'),
                role: Joi.string().trim().description('角色'),
                nickname: Joi.string().allow(['']).description('用户昵称'),
                mobile: Joi.string().allow(['']).description('号码'),
                email: Joi.string().allow(['']).description('邮箱'),
                introduction: Joi.string().allow(['']).description('简介或备注'),
                status: Joi.number().valid(userStatusValues).description('状态'),
            }),
            output: cudResultSchema
        },
        handler: userHandler.update
    },
    {
        meta: {
            swagger: {
                summary: '获取用户信息',
                description: '',
                tags: ['用户']
            }
        },
        path: '/user/info',
        method: 'GET',
        commomRoute: true,  // 通用路由，不需要检测权限
        auth: true,
        validate: {
            // body: Joi.any(),
            output: cudResultSchema
        },
        handler: userHandler.getInfo
    },
    {
        meta: {
            swagger: {
                summary: '获取路由列表',
                description: '',
                tags: ['用户']
            }
        },
        path: '/user/routes',
        method: 'GET',
        auth: true,
        commomRoute: true,  // 通用路由，不需要检测权限
        validate: {
            // body: Joi.any(),
            output: cudResultSchema
        },
        handler: userHandler.routes
    },
    {
        meta: {
            swagger: {
                summary: '退出登录',
                description: '',
                tags: ['用户']
            }
        },
        path: '/user/logout',
        method: 'POST',
        auth: true,
        validate: {
            body: Joi.any(),
            output: cudResultSchema
        },
        handler: userHandler.logout
    },
    {
        meta: {
            swagger: {
                summary: '获取用户api',
                description: '',
                tags: ['用户']
            }
        },
        path: '/user/getApi',
        method: 'GET',
        auth: true,
        validate: {
            // body: Joi.any(),
            output: cudResultSchema
        },
        handler: userHandler.getApis
    },
    {
        meta: {
          swagger: {
            summary: '用户列表',
            description: '',
            tags: ['用户']
          }
        },
        path: '/user/list',
        method: 'GET',
        auth: true,
        validate: {
            query: Joi.object({
                isLoadAll: Joi.boolean().description('是否加载所有').default(false),
                name: Joi.string().description('角色类型')
            }).keys(pagingSchema.request),
            output: cudListSchema
        },
        handler: userHandler.search
    },
    {
        meta: {
            swagger: {
                summary: '删除用户',
                description: '',
                tags: ['用户']
            }
        },
        path: '/user/delete',
        method: 'PUT',
        projectRoles,
        auth: true,
        validate: {
            body: Joi.object({
                ids: Joi.array().description('记录id数组')
            }),
            output: cudResultSchema
        },
        handler: userHandler.delete
    }
]