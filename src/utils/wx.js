import sha1 from "sha1"
import Config from 'config'
import Http from "./http"
import redis from "./redis"

export async function getWxAccessToken() {
    let accessToken = await redis.get('wxAccessToken')
    if (accessToken) return accessToken
    let res = await Http.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${Config.wx_official.appid}&secret=${Config.wx_official.secret}`)
    // 失败 {"errcode":40013,"errmsg":"invalid appid"}
    // 成功 {"access_token":"ACCESS_TOKEN","expires_in":7200}
    if (res && res.access_token) {
        await redis.set('wxAccessToken', res.access_token, res.expires_in-10)
        accessToken = res.access_token
    }
    
    return accessToken
}

export function isFromWx(timestamp, nonce, signature) {
    let arr = [Config.wx_official.token, timestamp, nonce]
    let sha = sha1(arr.sort().join(''))
    let isFromwx = sha === signature
    if (isFromwx) {
        console.log('wxPublic: is from wx')
    }
    return isFromwx
}