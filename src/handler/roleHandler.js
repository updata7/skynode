import roleModel from "../model/roleModel"
import userModel from "../model/userModel"
import { assert, CODES, HTTP_STATUS } from "../utils/error"
import { clearRolePermCache } from "../utils/tools"

class RoleHandler {
    async createOne (ctx) {
        const { name, description, permissions } = ctx.request.body
        const { addedId } = await roleModel.create({ name, permissions, description })
        ctx.body = { success: true, addedId }
    }
  
    async updateOne (ctx) {
        const { id, name, description, permissions } = ctx.request.body
        const old = await roleModel.findById(id)
        assert(!old, HTTP_STATUS.InternalServerError, CODES.INTERNAL_SERVER_ERROR, `角色不存在 ${name} ${id}`)
        await roleModel.updateById(id, { name, permissions, description })
        if (name) {
            await userModel.updateMulti({role: old.name}, {role: name}, {multi: true})
        }
        await clearRolePermCache(old.name)
        ctx.body = { success: true }
    }
  
    async search (ctx) {
        const { name } = ctx.request.query
        const { pageNo: page, pageSize: limit, sortField, sortOrder, isLoadAll } = ctx.request.query
        const { data, total } = await roleModel.search({ name }, { page, limit, sortField, sortOrder, isLoadAll })
        ctx.body = { data, total }
    }
  
    async delete (ctx) {
        const { ids } = ctx.request.body
        const query = { _id: { $in: ids } }
        const records = await roleModel.find(query, { name: 1 })
        await Promise.all(records.map(async(r) => {
            await clearRolePermCache(r.name)
        }))
        await roleModel.remove(query)
        ctx.body = { success: true }
    }
}

export default new RoleHandler()