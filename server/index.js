
const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const R = require("ramda");


const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')

const fileName = ["router"];
const filePath = './middleware/';     //配置在中间件引入时候的路径

class ProjectNuxt{
  constructor(){
    this.app = new Koa();
    config.dev = !(this.app.env === 'production')
  }
  runCallBack(cb){
    cb();
  }
  middleware(){
    var that = this;

    return R.map(
      R.compose(
        i => i( that.app ),
        require,
        i => { return `${filePath}${i}` }
      )
    )
  }
  async start(){
    // Instantiate nuxt.js
    const nuxt = new Nuxt(config)  //暂时注释

    //Build in development          //< //暂时注释
    if (config.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    }                             // //暂时注释 >

    this.middleware()(fileName);    //中间件执行

    this.app.use(ctx => {
      ctx.status = 200 // koa defaults to 404 when it sees that status is unset

      return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve)
        ctx.res.on('finish', resolve)
        nuxt.render(ctx.req, ctx.res, promise => {             //< //暂时注释
          // nuxt.render passes a rejected promise into callback on error.
          promise.then(resolve).catch(reject)
        })                                                     // //暂时注释 >
      })
    })

    this.app.listen(port, host)
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  }
}

// async function start() {
//   // Instantiate nuxt.js
//   const nuxt = new Nuxt(config)

//   // Build in development
//   if (config.dev) {
//     const builder = new Builder(nuxt)
//     await builder.build()
//   }

//   app.use(ctx => {
//     ctx.status = 200 // koa defaults to 404 when it sees that status is unset

//     return new Promise((resolve, reject) => {
//       ctx.res.on('close', resolve)
//       ctx.res.on('finish', resolve)
//       nuxt.render(ctx.req, ctx.res, promise => {
//         // nuxt.render passes a rejected promise into callback on error.
//         promise.then(resolve).catch(reject)
//       })
//     })
//   })

//   app.listen(port, host)
//   consola.ready({
//     message: `Server listening on http://${host}:${port}`,
//     badge: true
//   })
// }

// start()
//
//
//     // "dev": "cross-env NODE_ENV=development nodemon server/index.js --watch server",
//
//
var projectNuxt = new ProjectNuxt();
projectNuxt.start();
