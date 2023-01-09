import Joi from 'joi'
import menuHandler from '../handler/menuHandler'
import { mongoIdSchema, cudResultSchema, pagingSchema } from './schema'
import { userprojectRoles } from '../dictionary/user'

const projectRoles = [userprojectRoles.admin.value]     // 仅允许admin用户访问

export default [{
    meta: {
        swagger: {
        summary: '新增菜单',
        description: '',
        tags: ['菜单管理']
        }
    },
    path: '/menu/add',
    method: 'POST',
    projectRoles,
    auth: true,
    validate: {
        body: Joi.object({
            type: Joi.string().required().description('菜单类型 DIR for 目录 MENU for 菜单 LINK for 外链'),
            hidden: Joi.boolean().required().description('状态 true for 显示 false for 隐藏'),
            meta: Joi.object({
                icon: Joi.string().allow(['']).description('图标'),
                title: Joi.string().trim().required().description('菜单名'),
                affix: Joi.boolean(),
            }),
            alwaysShow: Joi.boolean().description('是否一直显示'),
            sort: Joi.number().required().description('排序'),
            path: Joi.string().trim().description('路由路径 或 外链'),
            component: Joi.string().trim().description('页面路径'),
            permissions: Joi.array().description('接口权限'),
            parentId: Joi.string().trim().description('父级菜单记录id')
        }),
        output: cudResultSchema
    },
    handler: menuHandler.createOne
}, {
    meta: {
        swagger: {
        summary: '获取菜单层级',
        description: '',
        tags: ['菜单管理']
        }
    },
    path: '/menu/options',
    method: 'POST',
    projectRoles,
    auth: true,
    validate: {
        body: Joi.any(),
        output: cudResultSchema
    },
    handler: menuHandler.options
}, {
    meta: {
        swagger: {
            summary: '获取菜单列表',
            description: '',
            tags: ['菜单管理']
        }
    },
    path: '/menu/search',
    method: 'GET',
    projectRoles,
    auth: true,
    validate: {
        query: Joi.object({
            title: Joi.string().trim().description('菜单名')
        }),
        output: {
            records: Joi.array()
        }
    },
    handler: menuHandler.search
}, {
    meta: {
        swagger: {
            summary: '删除菜单',
            description: '',
            tags: ['菜单管理']
        }
    },
    path: '/menu/delete',
    method: 'PUT',
    auth: true,
    projectRoles,
    validate: {
        body: Joi.object({
            ids: Joi.array().description('记录id数组')
        }),
        output: cudResultSchema
    },
    handler: menuHandler.delete
}, {
    meta: {
        swagger: {
        summary: '修改菜单',
        description: '',
        tags: ['菜单管理']
        }
    },
    path: '/menu/update',
    method: 'POST',
    auth: true,
    projectRoles,
    validate: {
        body: Joi.object({
            id: mongoIdSchema.required().description('角色ID'),
            type: Joi.string().required().description('菜单类型 DIR for 目录 MENU for 菜单 LINK for 外链'),
            hidden: Joi.boolean().required().description('状态 true for 显示 false for 隐藏'),
            meta: Joi.object({
                icon: Joi.string().allow(['']).description('图标'),
                title: Joi.string().trim().required().description('菜单名'),
                affix: Joi.boolean(),
            }),
            alwaysShow: Joi.boolean().description('是否一直显示'),
            sort: Joi.number().required().description('排序'),
            path: Joi.string().trim().description('路由路径 或 外链'),
            component: Joi.string().trim().description('页面路径'),
            permissions: Joi.array().description('接口权限'),
            parentId: Joi.string().trim().description('父级菜单记录id')
        }),
        output: cudResultSchema
    },
    handler: menuHandler.update
}]