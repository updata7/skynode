import sequelize from '../model'

const roleModel = sequelize.models.role;
export default new class RoleEngine {
    
    /**
     * 获取列表
     */
    async search(w, options) {
        const { count, rows } = await roleModel.findAndCountAll({where: w, ...options});
        return { rows, count };
    }

    /**
     * 通过id更新数据d
     * @param id 主键id
     * @param update 新数据
     */
    async updateById(id, update) {
        console.debug("userEngine upateById ==> ", id, update);
        await roleModel.update(update, {
            where: {
                id
            }
        })
    }

    /**
     * 删除数据
     * @param ids id数组
     */
    async delete(ids) {
        await roleModel.destroy({
            where: {
                id: ids
            }
        })
    }

    // 创建
    async create (data) {
        console.debug('data =====> ', data)
        const res = await roleModel.create(data)
        return res
    }
}
