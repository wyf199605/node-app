import * as KoaRouter from 'koa-router';
import {loginRouter} from "./controls/login";
import {uploadRouter} from "./controls/upload";

let router: KoaRouter = new KoaRouter({
    prefix: '/admin'
});

router.use(loginRouter.routes(), loginRouter.allowedMethods());

router.use(uploadRouter.routes(), uploadRouter.allowedMethods());

router.all('/', async (ctx) => {
    ctx.throw(404);
});

export const Router = router;




