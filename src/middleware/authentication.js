import { pathToRegexp } from 'path-to-regexp'
import Config from 'config'
import userHandler from '../handler/userHandler'
import { getSign } from '../utils/tools'
import { HTTP_STATUS } from '../utils/error'

export function getAuthentication(routers) {
    const methodPathRegexps = []
    const { routes = [] } = routers
    const methodPathRegexpAuthMap = {}
    const methodPathRegexpProjectRolesMap = {}
    const methodPathCommomRouteMap = {}
    routes.forEach(item => {
        const methodPath = (`${Config.apiPrefix}${item.path}:${item.method}`).toLowerCase()
        const methodPathRegexp = pathToRegexp(methodPath)
        methodPathRegexps.push(methodPathRegexp)
        methodPathRegexpAuthMap[methodPathRegexp] = item.auth
        methodPathCommomRouteMap[methodPathRegexp] = item.commomRoute
        methodPathRegexpProjectRolesMap[methodPathRegexp] = item.projectRoles
    })

    return async (ctx, next) => {
        const methodPath = (`${ctx.path}:${ctx.request.method}`).toLowerCase()
        const methodPathRegexp = methodPathRegexps.filter(item => item.test(methodPath))[0]
        const needAuth = methodPathRegexpAuthMap[methodPathRegexp]
        const projectRoles = methodPathRegexpProjectRolesMap[methodPathRegexp]
        const commonRoute = methodPathCommomRouteMap[methodPathRegexp]
        let hasPermission = true
        if (needAuth) {
            const { 'access-token': token } = ctx.request.header
            ctx.assert(token, HTTP_STATUS.Unauthorized, '授权字段为空')
            ctx.state.user = await userHandler.authVerifyToken(token)
            if (!commonRoute) {
                // 检验接口权限
                const apiPath = ctx.path.replace(Config.apiPrefix, '') // 去掉前缀
                hasPermission = await userHandler.checkPermission(ctx.state.user.role, apiPath)
            }
        }

        if (!hasPermission || (projectRoles && projectRoles.indexOf(ctx.state.user.role) <= -1)) {
            logger.debug("authorization ===> ", ctx.path, projectRoles, ctx.state.user.role)
            ctx.throw(HTTP_STATUS.Unauthorized, `没权限访问!`)
        }

        const params = ctx.request.body || ctx.request.query
        if (params.sign) {
            const pSign = params.sign || 'no'
            delete params.sign
            const sign = getSign(params)
            ctx.assert(sign === pSign, HTTP_STATUS.Unauthorized, '签名错误')
            params.sign = pSign
        }

        // todo 接口权限
        await next()
    }
}