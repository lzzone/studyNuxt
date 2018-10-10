const KoaRouter = require("koa-router");

const koaRouter = new KoaRouter();

function router(app){
    koaRouter.get('/', (ctx, next) => {
        console.log(123456)
        ctx.body = "123456";
    });

    app
    .use(koaRouter.routes())
    .use(koaRouter.allowedMethods());
}

module.exports = router