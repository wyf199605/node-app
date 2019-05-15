import {RouterContext} from "koa-router";
import {IUser, User} from "../../database/User";

export async function registerRouteHandler(ctx: RouterContext){
    let data: IUser = ctx.request.body;
    try{
        let user = User.findOne({
            username: data.username
        });
    }catch (e) {

    }
}
