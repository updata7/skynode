import { userprojectRoles, userStatus } from "../dictionary/user"
import menuModel from "../model/menuModel"
import roleModel from "../model/roleModel"
import userModel from "../model/userModel"
import { assert, CODES, HTTP_STATUS } from "../utils/error"
import { genToken, getTokenCacheKey, removeKey, verifyToken } from "../utils/tools"
import { getAllApis } from "../middleware/router"
import mongoose from "mongoose"
import _ from 'lodash'

export default new class UserHandler {
    async checkPermission(role, apiPath) {
        // 超级管理员不用检测
        if (role === userprojectRoles.admin.value) return true

        let permissions = await redis.get(`role:${role}`)
        if (permissions) {
            permissions = JSON.parse(permissions)
        } else {
            const roleInfo = await roleModel.findOne({ name: role })
            assert(!roleInfo, HTTP_STATUS.InternalServerError, CODES.INTERNAL_SERVER_ERROR, `角色或被删除，请重新分配 ${role}`)
            const res = await menuModel.find({ _id: { $in: roleInfo.permissions } }, { permissions: 1, _id: 0 })
            const tmpPermissions = res.filter(r => r.permissions)
            permissions = []
            for (let u of tmpPermissions) {
                permissions.push(...u.permissions.map(r => r[1]))
            }
            await redis.set(`role:${role}`, JSON.stringify(permissions))
        }
        // logger.debug("permissions ==> ", permissions)
        if (permissions.indexOf(apiPath) <= -1) {
            // 没有权限
            logger.debug("checkPermission ==> ", permissions, apiPath)
            return false
        }

        return true
    }

    async authVerifyToken(token) {
        try {
            const { id, account } = verifyToken(token)
            assert(!(id && account), HTTP_STATUS.InternalServerError, CODES.INTERNAL_SERVER_ERROR, "无效token")
            const cacheToken = await redis.get(getTokenCacheKey(account))
            assert(!cacheToken, HTTP_STATUS.Unauthorized, CODES.TOKEN_INVALID, 'token验证失败，请重新登录')
            assert(cacheToken !== token, HTTP_STATUS.Unauthorized, CODES.TOKEN_EXPIRED, '已在其他设备登录！')
            let userData
            userData = await redis.get(`userData:${account}`)
            // if (userData) {
            //     logger.debug('userData in cache ==> ', userData)
            //     return JSON.parse(userData)
            // }

            userData = await userModel.findOne({ _id: id }, { salt: 0, password: 0, createTime: 0, updateTime: 0 })
            assert(!userData, HTTP_STATUS.Unauthorized, CODES.USER_NOT_EXISTS, '无效用户')
            assert(userData.status !== userStatus.normal.value, HTTP_STATUS.Forbidden, '该用户已被禁用')
            redis.set(getTokenCacheKey(account), token)
            // 缓存用户信息
            // await redis.set(`userData:${account}`, JSON.stringify(userData))
            return userData
        } catch (err) {
            assert(err.name === 'JsonWebTokenError', HTTP_STATUS.Unauthorized, CODES.TOKEN_INVALID, '检验失败')
            assert(err.name === 'TokenExpiredError', HTTP_STATUS.Unauthorized, CODES.TOKEN_EXPIRED, 'token已过期')
            throw err
        }
    }
    async login(ctx) {
        const { username: account, password, vCode } = ctx.request.body
        logger.info('userHandler login: ', account, password, vCode)
        const { id, status } = await userModel.checkAccountAndPassword({ account, password })
        ctx.assert(status === userStatus.normal.value, HTTP_STATUS.Forbidden, '该用户已被禁用')
        const token = genToken({ id, account })
        redis.set(getTokenCacheKey(account), token)
        ctx.body = { token, success: true }
    }

    async logout(ctx) {
        const { id, account } = ctx.state.user
        redis.set(getTokenCacheKey(account), null)
        ctx.body = { success: true }
    }

    async getInfo(ctx) {
        const user = ctx.state.user
        const { id, permissions, ...data } = user
        logger.debug('getInfo ===> ', data)
        ctx.body = {
            success: true,
            ...data
        }
    }

    async routes(ctx) {
        const { role } = ctx.state.user
        let query = {}
        // logger.debug('userHandler routes ==> ', role)
        const isAdmin = role === userprojectRoles.admin.value
        if (!isAdmin) {
            const roleInfo = await roleModel.findOne({ name: role }, { permissions: 1 })
            assert(!roleInfo, HTTP_STATUS.InternalServerError, CODES.INTERNAL_SERVER_ERROR, `找不到角色 ${role} 可能被删，请重新分配角色`)
            const permissions = roleInfo.permissions
            const objectIdPermissions = permissions.map(id => mongoose.Types.ObjectId(id))
            query = { _id: { $in: objectIdPermissions } }
            // logger.debug('userHandler query ===> ', query, objectIdPermissions, roleInfo)
        }
        const records = await menuModel.menus(query, { 
            createTime: 0, 
            updateTime: 0,
            type: 0,
            sort: 0
        }, isAdmin)
        if (_.isEmpty(records)) {
            assert(true, HTTP_STATUS.InternalServerError, CODES.INTERNAL_SERVER_ERROR, "尚未给该角色分配权限，请联系管理员")
        }
        // logger.debug('userHandler records ===> ', records)
        removeKey(records, ['id', 'parentId'])
        ctx.body = {
            success: true,
            records
        }
    }
    // 添加用户
    async create(ctx) {
        const { account: fatherAccount } = ctx.state.user
        const { account, password, role, nickname, mobile, email, introduction, status } = ctx.request.body
        logger.info('userHandler create: ', account, password, role)
        const doc = { account, password, role, nickname, mobile, email, introduction, status, fatherAccount }
        const { id } = await userModel.createOne(doc)
        ctx.body = { data: id, success: true }
    }

    // 注册
    async register(ctx) {

    }

    // 获取所有api
    async getApis(ctx) {
        ctx.body = {
            success: true,
            apis: getAllApis()
        }
    }

    // 更新
    async update(ctx) {
        const { id, account, password, role, nickname, mobile, email, introduction, status } = ctx.request.body
        const { account: fatherAccount } = ctx.state.user

        const res = await userModel.updateOne({ _id: id, fatherAccount }, { account, password, role, nickname, mobile, email, introduction, status })
        ctx.body = {
            success: true
        }
    }

    // 获取列表
    async search(ctx) {
        const { name, status, pageNo, pageSize, sortField, sortOrder, isLoadAll } = ctx.request.query
        const { role, account } = ctx.state.user
        let skip = (pageNo - 1) * pageSize
        let limit = pageSize
        let sort
        if (sortField) {
            sort = { [sortField]: sortOrder }
        }
        let query = {}
        if (role !== userprojectRoles.admin.value) {
            // 非超级管理员，只能获取子用户的数据
            query = {
                fatherAccount: account
            }
        }

        if (status) {
            query.status = status
        }

        if (name) {
            query.$or = [
                { account: new RegExp(name) },
                { fatherAccount: new RegExp(name) },
                { nickname: new RegExp(name) },
            ]
        }

        logger.info("userHandler search ===> ", query)
        const projection = {
            password: 0,
            salt: 0,
        }
        let users
        if (isLoadAll) {
            users = await userModel.find(query, projection)
        } else {
            users = await userModel.find(query, projection, { sort, limit, skip })
        }
        const total = await userModel.countDocuments(query)

        ctx.body = {
            data: users,
            total
        }
    }

    async delete(ctx) {
        const { ids } = ctx.request.body
        if (ids.indexOf(ctx.state.user.id) > -1) {
            // 不能删除自己
            ctx.body = {
                success: false,
                message: "不能删除自己"
            }
            return
        }
        await userModel.remove({ _id: { $in: ids } })
        ctx.body = { success: true }
    }
}
