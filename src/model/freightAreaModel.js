// 运费模板-指定区域运费

import mongoose from 'mongoose'
import BaseMongo from './baseMongo'
import { genSchema } from './schemaHelper'
  
const schema = genSchema({
    freight_id: { type: mongoose.Types.ObjectId, required: true }, // 模板ID
    codes: { type: Array, required: true }, // 地区代码
    start: { type: Number, required: true }, // 首件或首重
    start_fee: { type: Number, required: true }, // 首件或首重 运费
    add: { type: Number, required: true }, // 添加多少件（个）或重量（kg）
    add_fee: { type: Number, required: true }, // 每添加多少件（个）或重量（kg）的费用
})

export default new class FreightAreaModel extends BaseMongo {
  constructor () {
    super('freight_area', schema)
  }

  async updateOrInsert(dataArr, freight_id) {
    await Promise.all(dataArr.map(async(d) => {
        const { id, ...doc } = d
        if (id) {
            await this.updateOne({_id: id, freight_id }, { ...doc })
        } else {
            await this.create({ ...doc, freight_id })
        }
    }))
  }
}