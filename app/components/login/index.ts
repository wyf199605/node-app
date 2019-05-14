import {RouterContext} from "koa-router";
import {User} from "../../database/User";

export async function loginRouteHandler(ctx: RouterContext) {
    try {
        let data = ctx.request.body;

        let res = await User.findOne({username: data.name});
        if (res) {
            ctx.body = '用户名' + res.username + '已存在';
            return
        }
        let user = new User({
            username: data.name,
            password: data.password
        });
        await user.save();
        ctx.body = 'ok';
    } catch (e) {
        console.log(e);
        ctx.body = '插入失败';
    }
}
