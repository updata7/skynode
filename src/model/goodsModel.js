// 商品列表

import BaseMongo from './baseMongo'
import goodsProductModel from './goodsProductModel'
import { genSchema } from './schemaHelper'
  
const schema = genSchema({
    category_id: { type: String, required: true },     // 分类id
    pic_url: { type: String }, // 商品图片
    show_pic_or_video: { type: Number, required: true }, // 1 for 轮播图 2 for 视频
    list_pic_url: { type: Array }, // 商品轮播图
    video_url: { type: String }, // 视频
    is_index: { type: Boolean, required: true, default: false }, // 是否首页显示
    name: { type: String, required: true }, // 商品名称
    brief: { type: String, required: true }, // 商品简介
    unit: { type: String, required: true }, // 商品单位, 如 件、包、袋
    sales: { type: Number, required: true, default: 0 }, // 显示的 销量
    actual_sales: { type: Number, required: true, default: 0},  // 实际销量
    spec_id: { type: String, required: true }, // 型号和规格 id
    attr: { type: Number, required: true, default: 0 }, // 属性，0 for 普通， 1 for 新品
    express_template_id: { type: String, required: true }, // 快递模板id
    detail: { type: String, required: true }, // 详情
    on_sale: { type: Number, required: true, default: 0 },  // 1 for 上架 0 for 下架
    stock: { type: Number, required: true, default: 0 }, // 库存
    sort: { type: Number, default: 1 }, // 排序
})
  
export default new class GoodsCategoryModel extends BaseMongo {
  constructor () {
    super('goods', schema)
  }
}