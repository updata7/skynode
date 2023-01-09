import { getAllApis } from "../middleware/router"

class PermissionHandler {
    async search(ctx) {
        const data = getAllApis()
        ctx.body = { data }
    }
}

export default new PermissionHandler()