import BaseMongo from './baseMongo'
import _ from 'lodash'
import { assert, CODES, HTTP_STATUS } from '../utils/error'
import { genSchema } from './schemaHelper'

const schema = genSchema({
    path: { type: String, required: true, unique: true }, // 路由路径 或 外链
    type: { type: String },  // 菜单类型 DIR for 目录 MENU for 菜单 LINK for 外链
    hidden: { type: Boolean }, // 状态 true for 显示 false for 隐藏
    icon: { type: String },     // 图标
    sort: { type: Number }, // 排序
    component: { type: String }, // 页面路径
    permissions: { type: Array }, // 接口权限
    parentId: { type: String, default: '0' }, // 父级菜单记录id 是顶级菜单时为 0 或 空
    meta: { type: Object }, // { title: xx, icon: xx, affix: true }
    alwaysShow: { type: Boolean }, // 是否一直显示 type 为 DIR 时为true
})

export default new class MenuModel extends BaseMongo {
    constructor () {
      super('menu', schema)
    }
    
    _findParent(parents, parentId) {
        const p = parents.filter(p => p.id === parentId);
        if (p && p.length > 0) return p[0]


        for (let i = 0; i < parents.length; i++) {
            const p = parents[i]
            if (p.children && p.children.length > 0) {
                const p2 = this._findParent(p.children, parentId)
                if (p2) return p2
            }
        }
    }


    _dealMenu(menus) {        
        const records = _.uniqBy(menus, "id")   // 去重
        // logger.debug('menuModel _dealMenu menus ===> ', menus)
        // logger.debug('menuModel _dealMenu records ===> ', records)
        const parent = _.groupBy(records, 'parentId')
        // logger.debug('menuModel _dealMenu 222 ===> ', parent)
        for (let parentId in parent) {
            if (parentId !== '0') {
                const p = this._findParent(parent['0'], parentId)
                assert(!p, HTTP_STATUS.InternalServerError, CODES.INTERNAL_SERVER_ERROR, `数据有误，找不到父级 ${parentId}`)
                // logger.debug('menuModel _dealMenu 333 ===> ',, p)
                p.children = parent[parentId]
            }
            // logger.debug('menuModel _dealMenu 444 ===> ', parentId)
        }
        return parent['0']
    }
    async menus(query, project, isAdmin) {
        const cond = [
            { $sort: { sort: 1, createTime: 1 } },
            { $match: query },
            { $skip: 0 }
        ]
        if (project) {
            cond.push({
                $project: project
            })
        }
        // logger.debug('menuModel menus ==>> ', cond, query)
        const records = []
        if (!isAdmin) {
            // 非管理员，要获取父级菜单
            const tmpRes = await this.getParents(query)
            records.push(...tmpRes)
        }
        const tmpRes = await this.aggregate(cond)
        records.push(...tmpRes)
        return this._dealMenu(records)
    }

    async getParents(query) {
        const res = await this.find(query, { parentId: 1 } )
        const parentIds = res.filter(r => r.parentId !== '0').map(r => r.parentId)
        const res2 = await this.find({ _id: parentIds })
        // logger.debug('menuModel getParents ==>> ', res, parentIds, res2)
        return res2
    }
    async options(query) {
        const records = await this.aggregate([
            { $sort: { _id: 1 } }, // 因最终没有得到此两个字段，所以要在 $project 前
            { $project:{ parentId: 1, "title": "$meta.title" } },
            { $match: query },
            { $skip: 0 },
        ])
        return this._dealMenu(records)
    }

    async delete(query) {
        // logger.debug('menuModel delete ===>>', query)
        await this.remove(query)
    }
}