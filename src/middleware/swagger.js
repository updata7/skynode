import path from 'path'
import { koaSwagger } from 'koa2-swagger-ui'
import { SwaggerAPI } from 'koa-joi-router-docs'
import koaRouter from 'koa-joi-router'
import { name, version } from '../../package.json'

function getSwagger(routers) {
    let swagger = new SwaggerAPI()
    swagger.addJoiRouter(routers)

    const spec = swagger.generateSpec(
        {
            info: {
                title: name,
                description: `API document of ${name}`,
                version: version
            },
            basePath: '/',
            tags: [],
            securityDefinitions: {
                token: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header'
                }
            }
        },
        {
            defaultResponses: {
                200: {
                    code: 200,
                    data: {}
                }
            }
        }
    )

    
    /**
     * Swagger JSON API
     */
    let swaggerRouter = koaRouter()

    swaggerRouter.route({
        path: '/api/swagger.json',
        method: 'get',
        handler: (ctx) => {
          ctx.body = JSON.stringify(spec, null, '  ')
        }
    })

    const swaggerUI = koaSwagger({
        routePrefix: '/api/docs', // host at /swagger instead of default /docs
        swaggerOptions: {
            url: '/api/swagger.json',
        },
    })

    return { swaggerRouter, swaggerUI }
}

module.exports = getSwagger
