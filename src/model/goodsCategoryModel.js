// 商品分类

import BaseMongo from './baseMongo'
import { genSchema } from './schemaHelper'


const schema = genSchema({
    name: { type: String, required: true, unique: true },     // 分类名称
    isIconShow: { type: Boolean, required: true, default: false },  // 图标显示
    isHomepageShow: { type: Boolean, required: true, default: false }, // 首页显示
    isAllShow: { type: Boolean, required: true, default: false }, // 全部产品页面显示
    iconUrl: { type: String },     // 图标路径
    imgUrl: { type: String },     // 图片路径
    height: { type: Number },   // 图片高度
    sort: { type: Number, default: 1 }, // 排序
    brief: { type: String },   // 简介
})
  
export default new class GoodsCategoryModel extends BaseMongo {
  constructor () {
    super('goods_category', schema)
  }
}