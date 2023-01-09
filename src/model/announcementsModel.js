import BaseMongo from './baseMongo'
import { genSchema } from './schemaHelper'
  
const schema = genSchema({
    content: { type: String, required: true }, // 内容
    start_time: { type: Date, required: true },  // 开始时间
    end_time: { type: Date, required: true }, // 结束时间
})
  
export default new class RoleModel extends BaseMongo {
    constructor () {
      super('announcements', schema)
    }
}