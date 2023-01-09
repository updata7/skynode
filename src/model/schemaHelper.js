import mongoose from 'mongoose'

export function genSchema(schema) {
    return mongoose.Schema(schema, {
      timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
      autoIndex: true,
    })
}