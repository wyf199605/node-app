import * as KoaRouter from "koa-router";
import {User} from "../../models/User";
import {getTemplate} from "../../utils/file";
import {AppResult} from "../result";

const router = new KoaRouter();

router.get('/login', async function (ctx: KoaRouter.RouterContext) {
    ctx.type = 'html';
    ctx.body = await getTemplate('login');
});

router.post('/login', async function (ctx: KoaRouter.RouterContext) {
    ctx.type = 'json';
    try {
        let data = ctx.request.body;

        let res = await User.findOne({username: data.name});
        if (res) {
            ctx.body = new AppResult({
                code: 0,
                msg: '用户名' + res.username + '已存在'
            });
            return
        }
        let user = new User({
            username: data.name,
            password: data.password
        });
        await user.save();
        ctx.body = new AppResult({
            code: 200,
            msg: '插入成功'
        });
    } catch (e) {
        console.log(e);
        ctx.body = new AppResult({
            code: 0,
            msg: '插入失败'
        });
    }
});

export const loginRouter = router;


