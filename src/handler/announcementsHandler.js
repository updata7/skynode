import announcementsModel from "../model/announcementsModel"

class AnnouncementsHandler {
    async create (ctx) {
        const doc = ctx.request.body
        const { addedId } = await announcementsModel.create(doc)
        ctx.body = { success: true, addedId }
    }
  
    async update (ctx) {
        const { id, ...doc } = ctx.request.body
        await announcementsModel.updateById(id, doc)
        ctx.body = { success: true }
    }

    async search(ctx) {
        const params = ctx.request.query
        let query = {}
        const { data, total } = await announcementsModel.list(query, params)
        ctx.body = { data, total }
    }
  
    async delete (ctx) {
        const { ids } = ctx.request.body
        await announcementsModel.remove({ _id: { $in: ids } })
        ctx.body = { success: true }
    }
}

export default new AnnouncementsHandler()