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
