import BaseMongo from './baseMongo'
import { removeUndefinedKey } from '../utils/tools'
import { genSchema } from './schemaHelper'
  
const schema = genSchema({
    name: { type: String, required: true, unique: true }, // 角色
    description: { type: String },  // 角色描述
    permissions: { type: Array } // 菜单记录id数组 [id1, id2]
})
  
export default new class RoleModel extends BaseMongo {
    constructor () {
      super('role', schema)
    }

    async search (query, options) {
        const { page, limit, sortField, sortOrder, isLoadAll } = options
        let sort
        if (sortField) {
            sort = { [sortField]: sortOrder }
        }
        removeUndefinedKey(query)
        let data
        if (isLoadAll) {
            data = await this.find(query)
        } else {
            data = await this.find(query, null, { sort, limit, skip: (page - 1) * limit })
        }
        const total = await this.countDocuments(query)
        return { data, total }
    }
}