import BaseMongo from './baseMongo'
import { userStatus, userStatusValues } from '../dictionary/user'
import randomString from 'random-string'
import { assert, CODES, HTTP_STATUS } from '../utils/error'
import { getSaltedPassword, removeUndefinedKey } from '../utils/tools'
import { genSchema } from './schemaHelper'

const userStatusEnum = {
  values: userStatusValues,
  message: 'Wrong value as {VALUE} for type of user status'
}
  
const schema = genSchema({
  account: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }, // 角色
  salt: { type: String, required: true },
  nickname: { type: String },
  mobile: { type: String }, // 手机号
  email: { type: String }, // 邮箱
  avatar: { type: String }, // 头像
  introduction: { type: String, default: '欢迎使用本系统' },   // 介绍
  status: { type: Number, required: true, enum: userStatusEnum, default: userStatus.normal.value },
  fatherAccount: { type: String },  // 创建人account
})
  
export default new class UserModel extends BaseMongo {
  constructor () {
    super('user', schema)
  }

  // 校验账号密码
  async checkAccountAndPassword(options) {
    let { account, password } = options
    const userData = await this.findOne({ account })
    assert(!userData, HTTP_STATUS.InternalServerError, CODES.INTERNAL_SERVER_ERROR, `用户 ${account} 不存在！`)
    let tmp_salted_pwd = getSaltedPassword(password, userData.salt)
    assert(tmp_salted_pwd != userData.password, HTTP_STATUS.InternalServerError, CODES.INTERNAL_SERVER_ERROR, `密码错误`)
    return userData
  }

  // 检验账号是否存在
  async checkAccountIsExist(account) {
    const res = await this.existOne({ account })
    assert(res, HTTP_STATUS.InternalServerError, CODES.INTERNAL_SERVER_ERROR, `用户 ${account} 已经存在！`)
    return res
  }

  async createOne(options) {
    let { account, password, ...params } = options
    await this.checkAccountIsExist(account)
    const salt = randomString({ length: Math.ceil(Math.random() * 5) + 5, special: true })
    password = getSaltedPassword(password, salt)
    removeUndefinedKey(params)
    const doc = await this.create({account, password, salt, ...params})
    return { id: doc.id }
  }

  async updateOne(query, doc, options) {
    if (doc.password) {
      doc.salt = randomString({ length: Math.ceil(Math.random() * 5) + 5, special: true })
      doc.password = getSaltedPassword(doc.password, doc.salt)
    }
    removeUndefinedKey(doc)
    const res = await super.updateOne(query, doc, options)
    logger.debug('userModel updateOne ==> ', res, doc)
    return res
  }
}