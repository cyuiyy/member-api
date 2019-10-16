const Koa = require("koa");

const app =new Koa()

const path = require("path")

const bodyParser = require("koa-bodyparser");

const router = require("./router/");

const koaStatic = require("koa-static")

const staticPath =koaStatic(path.join(process.cwd(),'public'));

app.use(staticPath);

app.use(bodyParser())

app.use(router.routes());

app.use(router.allowedMethods());

app.listen(3000,()=>{
    console.log("服务启动成功，port"+3000)
})