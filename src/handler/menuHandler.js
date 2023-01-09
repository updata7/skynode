import { assert, CODES, HTTP_STATUS } from "../utils/error"
import menuModel from "../model/menuModel"
import { userprojectRoles } from "../dictionary/user"
import roleModel from "../model/roleModel"

class MenuHandler {
    async createOne (ctx) {
        const params = ctx.request.body
        logger.debug('menuHandler createOne ', params)
        const { parentId } = params
        if (parentId !== '0') {
            // 有父级
            const parent = await menuModel.findOne({
                id: parentId
            })
            assert(!parent, HTTP_STATUS.InternalServerError, CODES.INTERNAL_SERVER_ERROR, `不存在父级菜单 ${parentId}`)
        }

        await menuModel.create(params)
        ctx.body = { success: true }
    }
  
    async options(ctx) {
        const { role } = ctx.state.user
        let query = {}
        if (role !== userprojectRoles.admin.value) {
            // 非管理员，仅返回拥有的权限
            const roleInfo = await roleModel.findOne({ name: role })
            assert(!roleInfo, HTTP_STATUS.InternalServerError, CODES.INTERNAL_SERVER_ERROR, `角色不存在 ${role}`)
            const { permissions } = roleInfo
            query = {
                _id: { $in: permissions }
            }
        }
        const records = await menuModel.options(query)
        ctx.body = { success: true, records }
    }

    async update (ctx) {
        const { id, parentId, ...params } = ctx.request.body
        logger.debug('menuHandler update ===> ', id, parentId, params)
        const menu = await menuModel.existId(id)
        assert(!menu, HTTP_STATUS.InternalServerError, CODES.INTERNAL_SERVER_ERROR, `菜单不存在 ${id}`)
        if (parentId && parentId !== '0') {
            const parentMenu = await menuModel.existId(id)
            assert(!parentMenu, HTTP_STATUS.InternalServerError, CODES.INTERNAL_SERVER_ERROR, `父级菜单不存在 ${id}`)
        }

        await menuModel.updateById(id, { ...params, parentId })
        ctx.body = { success: true }
    }
  
    async search (ctx) {
        const { title } = ctx.request.query
        const isAdmin = ctx.state.user.role === userprojectRoles.admin.value
        const query = {}
        if (title) {
            query["meta.title"] = new RegExp(title)
        }
        const records = await menuModel.menus(query, null, isAdmin)
        ctx.body = { records }
    }
  
    async delete (ctx) {
        const { ids } = ctx.request.body
        logger.debug('menuHandler delete ===> ', ids)
        const query = { $or: [
            { _id: { $in: ids } },
            { parentId: { $in: ids } }
        ]}
        await menuModel.delete(query)
        ctx.body = { success: true }
    }
}

export default new MenuHandler()