import freightAreaModel from "../model/freightAreaModel"
import freightModel from "../model/freightModel"
import freightNotDeliveryAreaModel from "../model/freightNotDeliveryAreaModel"

import _ from "lodash"
import mongoose from "mongoose"

class FreightHandler {
    async create (ctx) {
        const { areas, not_delivery_areas, ...doc } = ctx.request.body
        const { id: addedId } = await freightModel.create(doc)
        logger.debug("freightHandler create ==> ", addedId)
        if (!_.isEmpty(areas)) {
            await freightAreaModel.updateOrInsert(areas, addedId)
        }

        if (!_.isEmpty(not_delivery_areas)) {
            await freightNotDeliveryAreaModel.updateOrInsert(not_delivery_areas, addedId)
        }

        ctx.body = { success: true, addedId }
    }
  
    async update (ctx) {
        const { id, areas, not_delivery_areas, ...freightDoc } = ctx.request.body
        const res = await freightModel.updateById(id, freightDoc)
        if (res.modifiedCount <= 0) {
            ctx.body = {
                success: false,
                message: `没有数据 ${id}`
            }
            return
        }

        if (!_.isEmpty(areas)) {
            await freightAreaModel.updateOrInsert(areas, id)
        } else {
            await freightAreaModel.remove({ freight_id: id })
        }

        if (!_.isEmpty(not_delivery_areas)) {
            await freightNotDeliveryAreaModel.updateOrInsert(not_delivery_areas, id)
        } else {
            await freightNotDeliveryAreaModel.remove({ freight_id: id })
        }

        ctx.body = { success: true }
    }

    async search(ctx) {
        const params = ctx.request.query
        let query = {}
        const { data, total } = await freightModel.list(query, params)
        // , [{
        //     from: 'freight_area', 
        //     localField: '_id', 
        //     foreignField: 'freight_id', 
        //     as: 'areas'
        // }, {
        //     from: 'freight_not_delivery_area', 
        //     localField: '_id',
        //     foreignField: 'freight_id',
        //     as: 'not_delivery_areas'
        // }])
        ctx.body = { data, total }
    }
  
    async getOne(ctx) {
        const { id } = ctx.request.query
        const query = { _id: mongoose.Types.ObjectId(id) }
        const pipelines = []
        pipelines.push({ $match: query })
        pipelines.push({ $lookup: {
            from: 'freight_areas', 
            localField: '_id', 
            foreignField: 'freight_id', 
            as: 'areas'
        }})
        pipelines.push({ $lookup: {
            from: 'freight_not_delivery_areas', 
            localField: '_id',
            foreignField: 'freight_id',
            as: 'not_delivery_areas'
        } })
        const data = await freightModel.aggregate(pipelines)
        logger.debug("data ===> ", id, data)
        ctx.body = { data: data.length > 0 ? data[0]: {} }
    }
    async delete (ctx) {
        const { ids } = ctx.request.body
        await freightModel.remove({ _id: { $in: ids } })
        ctx.body = { success: true }
    }
}

export default new FreightHandler()