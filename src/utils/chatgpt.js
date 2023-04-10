import Http from "./http";

const API_KEY = process.env.OPENAI_API_KEY; // 替换为你的OpenAI API密钥
const MODEL_ID = 'code-davinci-002'; // 替换为你想要使用的GPT模型ID
const API_URL = `https://api.openai.com/v1/completions`;

const text = 'Hello, ChatGPT!'; // 替换为你想要发送的文本消息


const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
}

function genPostData(text) {
    /**
     * prompt 字段包含您想要向模型提供的文本片段
        model 字段指定使用的模型，即 GPT-3 的 text-davinci-003 模型。
        max_tokens 字段指定了最大的文本片段长度，即 60 个 token。
        n 字段指定要生成的文本片段数量，即 1。
        stop 字段指定了生成文本的终止符，即换行符。
        temperature 字段指定了用于控制生成文本随机性的温度，即 0.7。
     */
    return {
        prompt: text,
        model: MODEL_ID,
        max_tokens: 60,
        n: 1,
        stop: '',
        temperature: 0.7,
    };
}
export async function sendMessage(text) {
    const postData = genPostData(text);
    const res = await Http.postJson(API_URL, postData, headers)
    console.log("res ==> ", typeof res, res)
    return res
}