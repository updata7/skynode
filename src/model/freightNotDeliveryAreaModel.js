// 运费模板-不配送区域

import mongoose from 'mongoose'
import BaseMongo from './baseMongo'
import { genSchema } from './schemaHelper'
  
const schema = genSchema({
    freight_id: { type: mongoose.Types.ObjectId, required: true }, // 模板ID
    codes: { type: Array, required: true }, // 地区代码
})
  
export default new class FreightNotDeliveryAreaModel extends BaseMongo {
  constructor () {
    super('freight_not_delivery_area', schema)
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