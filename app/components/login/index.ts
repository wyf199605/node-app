import {RouterContext} from "koa-router";
import {User} from "../../database/User";
import {AppResult} from "../result";

export async function loginRouteHandler(ctx: RouterContext) {
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
}
