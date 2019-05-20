import * as path from "path";
import * as fs from "fs";

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
