// 商品型号

import BaseMongo from './baseMongo'
import { genSchema } from './schemaHelper'
  
const schema = genSchema({
    name: { type: String, required: true, unique: true },     // 型号名称
    sort: { type: Number, default: 1 }, // 排序
})
  
export default new class GoodsCategoryModel extends BaseMongo {
  constructor () {
    super('goods_spec', schema)
  }
}