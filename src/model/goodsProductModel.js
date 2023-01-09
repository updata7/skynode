// 商品实际产品
import mongoose from 'mongoose'
import BaseMongo from './baseMongo'
import goodsModel from './goodsModel'
import { genSchema } from './schemaHelper'
  
const schema = genSchema({
    belong_user_id: { type: String, required: true }, // 所属用户id
    goods_id: { type: mongoose.Types.ObjectId, required: true },     // 所属商品id
    // goods_spec_id: { type: String, require: true }, // 所属规格id
    sku: { type: String, required: true }, // 商品sku
    short_name: { type: String }, // 快递单上的简称
    attr: { type: String, required: true }, // 型号或规格 如 棕色
    cost: { type: Number, required: true }, // 成本
    retail: { type: Number, required: true }, // 零售
    weight: { type: Number, required: true }, // 重量 KG
    stock: { type: Number, required: true }, // 库存
    sort: { type: Number, default: 1 }, // 排序
    on_sale: { type: Number, required: true, default: 0 }, // 0 for 上架，1 for 下架
})

schema.index({ belong_user_id: 1, sku: 1 }, { background: true, unique: true })

export default new class GoodsCategoryModel extends BaseMongo {
  constructor () {
    super('goods_product', schema)
  }

  // 更新或插入
  async updateOrInsert(products, goods_id, belong_user_id) {
    await Promise.all(products.map(async(p) => {
      const { id, ...doc } = p
      if (id) {
          await this.updateOne({_id: id, belong_user_id }, { ...doc, goods_id })
      } else {
          await this.create({ ...doc, goods_id, belong_user_id })
      }
    }))
  }

  async deleteByGoodsId(goods_ids) {
    await this.remove({ goods_id: { $in: goods_ids } })
  }

  async getGoodsIdById(id) {
    const res = await this.findById(id)
    if (!res) return
    return mongoose.Types.ObjectId(res.goods_id)
  }

  // 刷新库存总数
  async refreshStockByGoodsIds(goods_ids) {
    const records = await this.aggregate([
      { $match: { goods_id: { $in: goods_ids } } },
      { 
        $group: {
          _id: "$goods_id",
          stockSum: { $sum: "$stock" }
        }
      }
    ])

    const goodsStockSumObj = {}
    records.map(r => goodsStockSumObj[r.id] = r.stockSum)

    // logger.debug('goodsProductModel refresh stock ==> ', goods_ids, records, goodsStockSumObj)
    await Promise.all(goods_ids.map(async (goods_id) => {
      const stockSum = goodsStockSumObj[goods_id] || 0
      await goodsModel.updateById(goods_id, { stock: stockSum })
    }))
  }
}