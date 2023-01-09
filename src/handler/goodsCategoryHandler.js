import goodsCategoryModel from "../model/goodsCategoryModel"

export default new class GoodsCategoryHandler {
    async search(ctx) {
        const { name, ...options } = ctx.request.query
        let query = {}
        if (name) {
            query.name = new RegExp(name)
        }

        logger.info("goodsCategoryHandler search ===> ", query)

        const { data, total } = await goodsCategoryModel.list(query, options)

        ctx.body = { data, total }
    }

    async create(ctx) {
        const params = ctx.request.body
        logger.debug('goodsCategoryHandler create params ==> ', params)
        const res = await goodsCategoryModel.create(params)
        ctx.body = {
            success: true,
            id: res.id
        }
    }

    async update(ctx) {
        const { id, ...params } = ctx.request.body
        logger.debug('goodsCategoryHandler update params ==> ', id, params)

        const res = await goodsCategoryModel.updateById(id, params)

        logger.debug('goodsCategoryHandler update res ==> ', res)
        ctx.body = {
            success: true
        }
    }

    async delete(ctx) {
        const { ids } = ctx.request.body
        await goodsCategoryModel.remove({ _id: { $in: ids } })
        ctx.body = { success: true }
    }
}