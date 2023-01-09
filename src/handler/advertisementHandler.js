import advertisementModel from "../model/advertisementModel"

class AdvertisementHandler {
    async create (ctx) {
        const doc = ctx.request.body
        const { addedId } = await advertisementModel.create(doc)
        ctx.body = { success: true, addedId }
    }
  
    async update (ctx) {
        const { id, ...doc } = ctx.request.body
        await advertisementModel.updateById(id, doc)
        ctx.body = { success: true }
    }

    async search(ctx) {
        const params = ctx.request.query
        let query = {}
        const { data, total } = await advertisementModel.list(query, params, {
            from: 'goods', 
            localField: 'goods_id', 
            foreignField: '_id', 
            as: 'goods'
        })
        ctx.body = { data, total }
    }
  
    async delete (ctx) {
        const { ids } = ctx.request.body
        await advertisementModel.remove({ _id: { $in: ids } })
        ctx.body = { success: true }
    }
}

export default new AdvertisementHandler()