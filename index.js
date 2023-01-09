const options = {
    mode: 'all',    // 同时支持 "use script" or .cjs
    // 支持cjs后缀文件
    cjs: {
        cache: true,
        extensions: false,
        interop: false,
        namedExports: true,
        paths: true,
        vars: true
    },
    await: true,
}

const esm = require('esm')
const app = esm(module, options)('./src/app.js')

app.start()