import BaseMongo from './baseMongo'
import { genSchema } from './schemaHelper'
import mongoose from 'mongoose'

const schema = genSchema({
    image_url: { type: String, required: true }, // 广告图片
    goods_id: { type: mongoose.Types.ObjectId },  // 关联商品id
    link_type: { type: Number, required: true }, // 关联商品类型，0 for 商品，1 for 链接
    link_url: { type: String }, // 关联链接
    end_time: { type: Date, required: true }, // 结束时间
    sort: { type: Number, required: true, default: 1 }, // 排序
    status: { type: Boolean, required: true, default: true }, // 状态
})
  
export default new class RoleModel extends BaseMongo {
    constructor () {
      super('advertisement', schema)
    }
}