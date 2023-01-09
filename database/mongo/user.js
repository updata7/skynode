import randomString from 'random-string'
const salt = randomString({ length: Math.ceil(Math.random() * 5) + 5, special: true })
import { getSaltedPassword } from '../../src/utils/tools'
let password = "12345678"
password = getSaltedPassword(password, salt)

module.exports = [
    {
        account: 'admin', 
        password,
        salt,
        realName: '管理员', 
        nickName: '管理员', 
        remark: '管理员', 
        role: 'admin'
    }
]