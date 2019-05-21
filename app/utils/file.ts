import * as fs from 'fs';
import * as path from "path";

/**
 * 判断目录是否存在，不存在则创建
 *
 * @param dirname 文件目录
 */
export function checkDirExist(dirname: string){
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, {recursive: true});
    }
}

/**
 * 根据时间日期生成文件上传的目录
 *
 * @return string 返回文件上传路径
 */
export function getFileDirname(): string{
    let date = new Date(),
        year = date.getFullYear(),
        mouth = date.getMonth() + 1,
        day = date.getDate();

    return `${year}${mouth < 10 ? '0' + mouth : mouth}${day < 10 ? '0' + day : day}`;
}

/**
 * 获取views文件夹下对象的模板
 *
 * @param model 模块名称
 * @param filename 文件名称，默认index
 * @param ext 文件后缀，默认HTML
 * @return Promise<Buffer> 文件内容
 */
export function getTemplate(model: string, filename = 'index', ext = 'html'): Promise<Buffer> {
    return new Promise(((resolve, reject) => {
        let filepath =  path.resolve(__dirname, '../views', model, filename + '.' + ext);
        fs.readFile(filepath, (err, res) => {
            if(err){
                reject(err);
            }else{
                resolve(res);
            }
        });
    }));
}
