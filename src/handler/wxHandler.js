import _ from 'lodash'
import { parseXML } from '../utils/tools';
import { isFromWx } from "../utils/wx"

import { Configuration, OpenAIApi } from "openai";
import { sendMessage } from '../utils/chatgpt';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default new class WxHandler {

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
            const smRes = await sendMessage(xml.Content)
            const content = smRes.choices[0].text
            // 发送消息
            ctx.body = `
                <xml>
                    <ToUserName><![CDATA[${xml.FromUserName}]]></ToUserName>
                    <FromUserName><![CDATA[${xml.ToUserName}]]></FromUserName>
                    <CreateTime>${new Date().getTime()}</CreateTime>
                    <MsgType><![CDATA[text]]></MsgType>
                    <Content><![CDATA[${content}]]></Content>
                </xml>
            `
        } catch (e) {
            console.error('error ==> ', e)
            ctx.body = ''
        }
    }
}
