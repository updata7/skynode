// 运费模板

import BaseMongo from './baseMongo'
import { genSchema } from './schemaHelper'
  
const schema = genSchema({
    name: { type: String, required: true }, // 模板名称
    charge_type: { type: Number, required: true }, // 付费类型 0 for 自定义邮费 1 for 卖家承担运费
    freight_type: { type: Number, require: true }, // 收费类型 0 for 按件计费 1 for 按重计费
    start: { type: Number, required: true }, // 首件或首重
    start_fee: { type: Number, required: true }, // 首件或首重 运费
    add: { type: Number, required: true }, // 添加多少件（个）或重量（kg）
    add_fee: { type: Number, required: true }, // 每添加多少件（个）或重量（kg）的费用
})
  
export default new class FreightModel extends BaseMongo {
  constructor () {
    super('freight', schema)
  }
}