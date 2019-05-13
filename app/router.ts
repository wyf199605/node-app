import * as KoaRouter from 'koa-router';
import {loginRoute} from "./components/login";

let router: KoaRouter = new KoaRouter();

router.get('/user/:name', async (ctx: KoaRouter.RouterContext) => {
    ctx.body = 'hello world';
    console.log(ctx.query);
});

router.get('/test', loginRoute);

router.post('/login', async (ctx: KoaRouter.RouterContext) => {
    let data = ctx.request.body;
    console.log(data);
    ctx.body = {
        success: true
    };
});

router.all('/', async (ctx) => {
    ctx.throw(404);
});

export const Router = router;




