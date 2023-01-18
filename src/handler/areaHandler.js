const { data, province, city, area, town } = require('province-city-china/data');
// console.log('data ==> ', data)
// console.log('province ==> ', province)
// console.log('city ==> ', city)
// console.log('area ==> ', area)
// console.log('town ==> ', town)

class AreaHandler {
    getProvince(ctx) {
        ctx.body = {
            data: province
        }
    }
}

export default new AreaHandler()