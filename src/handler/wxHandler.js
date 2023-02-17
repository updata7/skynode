import _ from 'lodash'
import { parseXML } from '../utils/tools';
import { isFromWx } from "../utils/wx"
const getRawBody = require('raw-body');

export default new class UserHandler {

    async officialAccount(ctx) {
        const { signature, timestamp, nonce, echostr, openid } = ctx.request.query
        console.log(`signature(${signature}) timestamp(${timestamp}) nonce(${nonce}) echostr(${echostr})`)
        if (!isFromWx(timestamp, nonce, signature)) {
            ctx.body = "failed"
            return
        }

        if (echostr) {
            // 接口验证的，直接返回即可
            ctx.body = echostr
            return
        }
        try {
            const xml = await parseXML(ctx.request.body)
            console.log("===> ", new Date().getTime(), xml)
            // 收到消息
            ctx.body = `
                <xml>
                    <ToUserName><![CDATA[${xml.FromUserName}]]></ToUserName>
                    <FromUserName><![CDATA[${xml.ToUserName}]]></FromUserName>
                    <CreateTime>${new Date().getTime()}</CreateTime>
                    <MsgType><![CDATA[text]]></MsgType>
                    <Content><![CDATA[你好]]></Content>
                </xml>
            `
        } catch (e) {
            console.error('error ==> ', e)
            ctx.body = ''
        }
    }
}
