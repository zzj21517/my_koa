// 引入模块
const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
// 实例化
const app = new Koa()
const router = new Router()

// 配置静态资源中间件
app.use(static(__dirname + '/static'))

// 配置模板引擎中间件
// 模版的后缀是.html
// app.use(views('views',{
//     map:{html:'ejs'}
// }))
// 模版的后缀是.ejs
app.use(views('views', {
    extension: 'ejs'
}))

// // 写一个中间件配置公共信息
// app.use(async (ctx, next) => {
//     ctx.state.commonData = '这是一个公有数据，每个页面都能引用'
//     //    继续向下匹配路由
//     await next()
// })

// 配置路由
router.get('/', async (ctx, next) => {
    // ctx 上下文context,包含了request与response
    await ctx.render('index', {})
})

// 原生方式获取
// router.post('/add', async (ctx) => {
//     getData = function () {
//         return new Promise(function (resolve, reject) {
//             try {
//                 let str = ''
//                 ctx.req.on('data', function (chunk) {
//                     str += chunk
//                 })
//                 ctx.req.on('end', function (chunk) {
//                     resolve(str)
//                 })
//             } catch (err) {
//                 reject(err)
//             }
//         })
//     }
//     let data = await getData()
//     ctx.body = data
// })

// 配置koa-bodyparser中间件
app.use(bodyParser())
router.post('/add', async (ctx) => {
    let data = ctx.request.body
    ctx.body = data
})

// 启动路由
app.use(router.routes());
app.use(router.allowedMethods())


app.listen(3000)
console.log('app is starting')