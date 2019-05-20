import * as KoaRouter from 'koa-router';
import {loginRouter} from "./controls/login";
import {uploadRouter} from "./controls/upload";

let router: KoaRouter = new KoaRouter();

router.use('/admin', loginRouter.routes(), loginRouter.allowedMethods());

router.use('/admin', uploadRouter.routes(), uploadRouter.allowedMethods());


router.all('/', async (ctx) => {
    ctx.throw(404);
});

export const Router = router;




