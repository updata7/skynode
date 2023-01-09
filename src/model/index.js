// mysql
import Config from 'config'
import { Sequelize } from 'sequelize';

const mysqlConfig = Config.mysql
const sequelize = new Sequelize(mysqlConfig.dbname, mysqlConfig.user, mysqlConfig.password, {
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    dialect: 'mysql',
    pool: {
        max: 5, // 连接池最大链接数量
        min: 0, // 最小连接数量
        idle: 10000, // 如果一个线程10秒内没有被使用的话，就释放连接池
    },
    // 显示所有日志函数调用参数 Show all log function call parameters
    // logging: console.log.bind(console)
    // logging: false   // 关闭sql执行日志
})

// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

const modelDefiners = [
    // require('./roleMysqlDemoModel').default,
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// We export the sequelize connection instance to be used around our app.
export default sequelize;