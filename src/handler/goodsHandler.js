import goodsModel from "../model/goodsModel";
import goodsProductModel from "../model/goodsProductModel";

import _ from "lodash";

class GoodsHandler {
    async search(ctx) {
        const { name, listType, ...options } = ctx.request.query
        let query = {}
        if (name) {
            query.name = new RegExp(name)
        }
        if (listType === 'saling') {
            // 出售中
            query.on_sale = 1
            query.stock = { $gt: 0 }
        } else if (listType === 'under') {
            // 下架
            query.on_sale = 0
        } else if (listType === 'sold') {
            // 已售完
            query.stock = { $lte: 0 }
        }

        logger.info("goodsCategoryHandler search ===> ", query)

        const { data, total } = await goodsModel.list(query, options, [{
            from: 'goods_products', localField: '_id', foreignField: 'goods_id', as: 'products'
        }])

        ctx.body = { data, total }
    }

    async create(ctx) {
        const { products, ...doc } = ctx.request.body
        const { id: belong_user_id } = ctx.state.user
        const stock = products.reduce((sum, curObj) => sum + curObj.stock, 0)

        const { id: goods_id } = await goodsModel.create({ ...doc, stock })
        await goodsProductModel.updateOrInsert(products, goods_id, belong_user_id)

        ctx.body = {
            success: true
        }
    }

    async update(ctx) {
        const { id, products, ...goodsDoc } = ctx.request.body
        const { id: belong_user_id } = ctx.state.user

        logger.debug('goodsHandler update ==> ', id, goodsDoc)
        let stock
        if (!_.isEmpty(products)) {
            stock = products.reduce((sum, curObj) => {
                if (!curObj.belong_user_id || curObj.belong_user_id === belong_user_id)
                    return sum + curObj.stock
                return sum
            }, 0)
        }

        const res = await goodsModel.updateById(id, { ...goodsDoc, stock })
        if (res.modifiedCount <= 0) {
            ctx.body = {
                success: false,
                message: `没有数据 ${id}`
            }
            return
        }
        if (!_.isEmpty(products))
            await goodsProductModel.updateOrInsert(products, id, belong_user_id)

        ctx.body = {
            success: true
        }
    }

    async delete(ctx) {
        const { ids } = ctx.request.body
        const res = await goodsModel.remove({ _id: { $in: ids } })
        logger.debug('goodsHandler.delete ==> ', res)
        await goodsProductModel.deleteByGoodsId(ids)
        ctx.body = { success: true }
    }
}

export default new GoodsHandler()