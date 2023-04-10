export { cors } from "./cors"

export async function logRequest(ctx, next) {
    const start = Date.now()
    await next()
    const timeUsed = Date.now() - start
    logger.info(`${ctx.method} ${ctx.status} ${ctx.url} ${timeUsed}ms`)
}

export async function setResponseHeader (ctx, next) {
    await next()
    ctx.response.set('Access-Control-Allow-Origin', '*')
}

export async function handleExceptionStatus (ctx, next) {
    try {
        await next()
    } catch (err) {
        let { name, status, code, message, captureOptions } = err
        logger.debug(`error ===> message(${message}), name(${name}), 
            status(${status}, err(${status}))`)
        ctx.message = "服务器内部错误"
        if (name === 'AssertError') {
            logger.error('error', err)
            ctx.status = status
        } else if (name === 'MongoError') {
            ctx.status = 500
            code = 500
            const { errmsg, code: mongoCode } = err
            const captureOptions = { errmsg, mongoCode }
            logger.error(message, { ...err, captureOptions })
        } else if (name === 'ValidationError') {
            ctx.status = 400
            delete err.stack
            logger.warn('请求参数验证错误', err)
        } else if (name === 'ForbiddenError') {
            ctx.status = 403
            logger.warn('权限验证错误', message)
        } else {
            ctx.status = status || 500
        }
    
        ctx.body = {
            status: ctx.status,
            code: code,
            message,
            options: captureOptions
        }
    }
}
  