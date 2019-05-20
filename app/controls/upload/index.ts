import * as KoaRouter from "koa-router";
import {getTemplate} from "../../utils/getTemplate";

const router = new KoaRouter();

router.get('/upload', async function(ctx: KoaRouter.RouterContext){
    ctx.type = 'html';
    ctx.body = await getTemplate('upload');
});

router.post('/upload', async function(ctx: KoaRouter.RouterContext){
    console.log(ctx.request.body);
    console.log(ctx.request.files);
});

export const uploadRouter = router;
