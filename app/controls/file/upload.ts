import * as KoaRouter from "koa-router";
import {getTemplate} from "../../utils/getTemplate";
import {GridFs} from "../../models/Files";
import {File} from "formidable";

interface ICheckProp{
    status: 'sendCheck';
    md5: string;
    uni_name: string;
    file_name: string;
}

interface IChunkCheckProp{
    status: 'chunkCheck';
    uni_name: string;
    chunk_index: number;
    size: number;
}

interface IMergeProp{
    status: 'chunksMerge';
    uni_name: string;
    chunks: number;
    md5: string;
    file_name: string;
}

type UploadProp = ICheckProp | IChunkCheckProp | IMergeProp ;

const router = new KoaRouter();

router.get('/upload', async function(ctx: KoaRouter.RouterContext){
    ctx.type = 'html';
    ctx.body = await getTemplate('upload');
});

router.post('/upload', async function(ctx: KoaRouter.RouterContext){
    let bucket = GridFs.getBucket();
    ctx.body = await Promise.all(Object.keys(ctx.request.files).map(async (key) => {
        let file: File = ctx.request.files[key];

        return await bucket.upload({
            name: file.name,
            type: file.type,
            path: file.path
        })

    }));

});

router.get('/file/:id', async function (ctx: KoaRouter.RouterContext){
    ctx.type = 'mp4';
    ctx.body = await GridFs.getBucket().findFileById(ctx.params.id);
});

router.post('/upload/file', async function (ctx: KoaRouter.RouterContext) {
    let post: UploadProp = ctx.request.body;
    switch (post.status) {
        // 秒传验证
        case "sendCheck":
            break;
        // 分块验证
        case "chunkCheck":
            break;
        // 合并请求
        case "chunksMerge":
            break;
        // 文件上传
        default:

    }
});

export const uploadRouter = router;
