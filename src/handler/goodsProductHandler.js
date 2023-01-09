import goodsProductModel from "../model/goodsProductModel";
import _ from 'lodash';
import mongoose from "mongoose";

class GoodsProductHandler {
    async check(ctx) {
        const { sku } = ctx.request.body
        const { id: userId } = ctx.state.user
        const res = await goodsProductModel.findOne({ belong_user_id: userId, sku })
        if (res) {
            ctx.body = {
                success: false,
                message: '该sku已存在'
            }
        } else {
            ctx.body = {
                success: true
            }
        }
    }
    async delete(ctx) {
        const { ids } = ctx.request.body
        const records = await goodsProductModel.find({ _id: { $in: ids } })
        logger.debug('goodsProductHandler delete ===>>', ids, records)
        const goods_ids = _.uniq(records.map(r => r.goods_id))
        // 删除
        const delRes = await goodsProductModel.remove({ _id: { $in: ids } })
        if (delRes && delRes.deletedCount >= 1) {
            await goodsProductModel.refreshStockByGoodsIds(goods_ids)
        }

        ctx.body = {
            success: true
        }
    }

    async update(ctx) {
        const { id, stock, ...doc } = ctx.request.body
        const res = await goodsProductModel.updateById(id, { stock, ...doc })
        if (res.modifiedCount <= 0) {
            ctx.body = {
                success: false,
                message: `没有数据 ${id}`
            }
            return
        }
        const goods_id = await goodsProductModel.getGoodsIdById(id)
        await goodsProductModel.refreshStockByGoodsIds([goods_id])
        ctx.body = {
            success: true,
        }
    }
}

export default new GoodsProductHandler();