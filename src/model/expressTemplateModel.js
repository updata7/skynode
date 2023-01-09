// 快递模板

import BaseMongo from './baseMongo'
import { genSchema } from './schemaHelper'
  
const schema = genSchema({
    name: { type: String, required: true }, // 模板名称
    pack_price: { type: String, required: true }, // 包装费用
    charge_way: { type: String, required: true }, // 收费方式
    // todo
})
  
export default new class GoodsCategoryModel extends BaseMongo {
  constructor () {
    super('express_template', schema)
  }
}