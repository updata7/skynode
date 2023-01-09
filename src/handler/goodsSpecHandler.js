import goodsSpecModel from "../model/goodsSpecModel"

export default new class GoodsSpecHandler {
    async search(ctx) {
        const { name, ...options } = ctx.request.query
        let query = {}
        if (name) {
            query.name = new RegExp(name)
        }

        logger.info("goodsSpecHandler search ===> ", query)

        const { data, total } = await goodsSpecModel.list(query, options)

        ctx.body = { data, total }
    }

    async create(ctx) {
        const params = ctx.request.body
        logger.debug('goodsCategoryHandler create params ==> ', params)
        const res = await goodsSpecModel.create(params)
        ctx.body = {
            success: true,
            id: res.id
        }
    }

    async update(ctx) {
        const { id, ...params } = ctx.request.body
        logger.debug('goodsCategoryHandler update params ==> ', id, params)

        const res = await goodsSpecModel.updateById(id, params)

        logger.debug('goodsCategoryHandler update res ==> ', res)
        ctx.body = {
            success: true
        }
    }

    async delete(ctx) {
        const { ids } = ctx.request.body
        await goodsSpecModel.remove({ _id: { $in: ids } })
        ctx.body = { success: true }
    }
}