import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as path from 'path';
import {Router} from "./router";
import "./models";
import jwt = require("koa-jwt");
import {getFileDirname} from "./utils/getFileDirname";
import {checkDirExist} from "./utils/checkDirExist";
import {File} from "formidable";

let app = new Koa();

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        console.log(e);

    }
});

// 使用koa-body模块，可通过cex.request.body 获取POST请求body参数
const fileDir = path.resolve(__dirname, '../upload');
app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: fileDir,
        keepExtensions: true,
        maxFieldsSize: 2 * 1024 * 1024,
        onFileBegin: (name, file: File) => {
            console.log(file);
            console.log(name);
            // let dir = path.resolve(fileDir, getFileDirname());
            // checkDirExist(dir);
            // file.path = `${dir}\\${file.name}`;
        }
    },
    onError: (err) => {
        if(err){
            console.log(err);
        }
    }
}));

app.use(Router.routes()).use(Router.allowedMethods());

// 监听错误
app.on('error', (err) => {
    console.log(err);
});

app.listen(3000, () => {
    console.log('成功监听在 3000');
});




