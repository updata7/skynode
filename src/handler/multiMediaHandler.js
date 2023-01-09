import { saveFiles } from '../utils/tools'

export default new class MultiMediaHandler {
    async upload(ctx) {
        let { files } = ctx.request.files
        logger.debug('MultiMediaHandler upload', files)
        const paths = await saveFiles(files)
        ctx.body = { paths }
    }
}