  <h1>skynode</h1>

## 项目简介

#### 本项目是一个完整后台管理及服务端接口API，提供上线部署流程

- 前端代码：[sky-vue-element-admin](https://gitee.com/ckjiang/sky-vue-element-admin)。基于 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin/tree/i18n)的国际版，感谢[作者PanJiaChen](https://github.com/PanJiaChen)（由于精力有限，本项目只做了简体中文的，并未支持国际版，囧。。。）
- 后端基于 Node.js➕MongoDB➕Koa2 实现的完整服务端接口API
- 项目模块
  - 登录 / 注册 / 注销
  - jwt验证
  - sign验证
  - 上传/下载文件
  - 用户管理
  - 角色管理
  - 菜单管理
  - 商品列表
  - 商品分类
  - 商品型号
  - 公告管理
  - 广告管理
  - 其他。。持续增加ing

- **MongoDB**使用[mongoose5.x](https://mongoosejs.com/docs/5.x/docs/index.html)，对应MongoDB server 需要v3.6+
- 一份好的api文档，可以减少前后端的交流时间，把时间用在刀刃上，本项目api使用[swagger](github.com/scttcper/koa2-swagger-ui](https://github.com/scttcper/koa2-swagger-ui))自动生成，后端不需要开发完接口后再操心api文档的琐事
- 项目封装简单，易扩展，开发功能流程方便，可供新手学习，也可以快速上手二次开发
- 具体文件结构介绍见**文件结构及说明表**

## 在线项目展示

[在线访问](http://120.24.170.189:9011/)

帐号：admin

密码：12345678

## 在线项目接口展示

[在线访问](http://120.24.170.189:9011/api/docs)

## 使用项目

### 环境准备

- Install [Node.js 13.0.1+](https://nodejs.org/en/)
- Install [MongoDB server v3.6+](https://www.mongodb.com/download-center#community)（具体安装就不说了，可自行google，不懂再微我）

### 克隆项目

```sh
$ git clone --depth=1 https://gitee.com/ckjiang/skynode.git
```

### 安装依赖

```sh
$ cd skynode
$ npm install
```

### 环境配置

```bash
$ mv .env_exapmle .env
$ vi .env 	// 修改为自己环境所需配置
```

### 运行

```bash
$ npm run dev
```



## 文件结构及说明表

| 文件名             | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| **src/app.js**     | 入口文件                                                     |
| **src/config**     | 环境配置文件，如端口号、MySQL、Redis、Mongo等设置            |
| **src/router**     | 存放客户端访问的路由文件，使用Joi进行参数验证，可限制接口get、post、put等请求方式，并且在此定义handler，即处理接口的入口函数 |
| **src/handler**    | 处理路由接口，可以说是前端与数据库的中间纽带                 |
| **src/engine**     | 通过模型(model)直接操作数据库，暂时仅供mysql使用             |
| **src/model**      | 存储和检索表结构，提供增删改查等接口供handler访问，主要文件有mongoManger.js/baseMongo.js |
| **src/middleware** | 中间件，swagger、路由验证、头部统一处理等                    |
| **src/utils**      | 存放redis和通用函数等文件                                    |
| **src/dictionary** | 存放常量字典                                                 |
| **src/service**    | 存放定时器服务                                               |
| **database**       | 存放要初始化的数据，文件命名跟数据库表名一致即可（不需要考虑前缀） |
| **lock**           | 已经初始化的表结构会自动生成一个.lock文件，如果要重新初始化，可删除对应的.lock文件 |
| **public/front**   | 存放前端编译好后的静态文件，这样只需要运行后端的服务，不需要运行前端服务，就能完整运行后台管理系统的 |
| **running**        | 此文件夹存放上传或下载的文件，不会默认创建，但是需要的时候会自动创建，比如上次一个文件时会自动创建 |
| **node_modules**   | 所有npm依赖项                                                |
| package.json       | 包含npm依赖项以及 [build scripts](#what-if-a-library-isnt-on-definitelytyped) |

## 捐赠

本项目会持续维护，如果对你有帮助的话，请你点一个星星 star 鼓励我，也可以请我喝杯果汁🍹

如果您有更好的建议和意见，请提出来告知我，可以留言 Issues或加我微信。希望能够帮助到你学习！

谢谢！共勉！

<img width="200" src="https://gitee.com/ckjiang/node-mysql-koa2/raw/main/image/wx.png"/><img width="200" src="https://gitee.com/ckjiang/node-mysql-koa2/raw/main/image/wx-pay.png"/><img width="200" src="https://gitee.com/ckjiang/node-mysql-koa2/raw/main/image/zfb-pay.png"/>

## 许可证

- MIT