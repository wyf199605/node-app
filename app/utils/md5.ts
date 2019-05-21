import * as crypto from 'crypto';
import * as fs from "fs";

export function md5(str){
    const md5Hash = crypto.createHash('md5');
    return md5Hash.update(str).digest('hex')
}

export function md5File(file: CustomFile): Promise<string>{
    return new Promise((resolve, reject) => {
        const md5Hash = crypto.createHash('md5');
        const stream = fs.createReadStream(file.path);
        stream.on('data', (d) => {
            md5Hash.update(d)
        });
        stream.on('end', () => {
            resolve(md5Hash.digest('hex'));
        });
        stream.on('error', (err) => {
            reject(err);
        });
    });
}

