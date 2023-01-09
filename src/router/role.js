import Joi from 'joi'
import roleHandler from '../handler/roleHandler'
import { mongoIdSchema, cudResultSchema, pagingSchema, cudListSchema } from './schema'
import { userprojectRoles } from '../dictionary/user'

const projectRoles = [userprojectRoles.admin.value]     // 仅允许admin用户访问

export default [{
  meta: {
    swagger: {
      summary: '新增角色',
      description: '',
      tags: ['role 角色']
    }
  },
  path: '/role/create',
  method: 'POST',
  projectRoles,
  auth: true,
  validate: {
    body: Joi.object({
      name: Joi.string().description('角色名字'),
      description: Joi.string().allow(['']).description('描述'),
      permissions: Joi.array().description('菜单id数组').example([
        'idxxx'
      ])
    }),
    output: cudResultSchema
  },
  handler: roleHandler.createOne
}, {
  meta: {
    swagger: {
      summary: '角色列表',
      description: '',
      tags: ['role 角色']
    }
  },
  path: '/role/search',
  method: 'GET',
  projectRoles,
  auth: true,
  validate: {
    query: Joi.object({
      isLoadAll: Joi.boolean().description('是否加载所有').default(false),
      name: Joi.string().description('角色类型')
    }).keys(pagingSchema.request),
    output: cudListSchema
  },
  handler: roleHandler.search
}, {
  meta: {
    swagger: {
      summary: '删除角色',
      description: '',
      tags: ['role 角色']
    }
  },
  path: '/role/delete',
  method: 'PUT',
  projectRoles,
  auth: true,
  validate: {
    body: Joi.object({
      ids: Joi.array().description('记录id数组')
    }),
    output: cudResultSchema
  },
  handler: roleHandler.delete
}, {
  meta: {
    swagger: {
      summary: '修改角色',
      description: '',
      tags: ['role 角色']
    }
  },
  path: '/role/update',
  method: 'POST',
  projectRoles,
  auth: true,
  validate: {
    body: Joi.object({
      id: mongoIdSchema.required().description('角色ID'),
      name: Joi.string().description('角色名字'),
      description: Joi.string().allow(['']).description('描述'),
      permissions: Joi.array().description('菜单id数组')
    }),
    output: cudResultSchema
  },
  handler: roleHandler.updateOne
}]