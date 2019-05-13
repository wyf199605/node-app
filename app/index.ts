import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import {Router} from "./router";

let app = new Koa();

app.use(async (ctx, next) => {
    try{
        await next();
    } catch (e) {
        console.log(e);
    }
});

// 使用koa-body模块，可通过cex.request.body 获取POST请求body参数
app.use(koaBody());

app.use(Router.routes()).use(Router.allowedMethods());

// 监听错误
app.on('error', (err) => {
    console.log(err);
});

app.listen(3000, () => {
    console.log('[demo] static-server is starting at port 3000')
});




