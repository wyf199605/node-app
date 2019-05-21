import * as mongoose from 'mongoose';
import {Binary, Db, GridFSBucket, Timestamp} from "mongodb";
import * as fs from "fs";
import {md5File} from "../utils/md5";

interface IFileSchema {
    _id: mongoose.Types.ObjectId; // 文档的唯一id
    filename?: string; // 文件名称
    chunkSize: number;  // 每个块的大小
    uploadDate: Timestamp; // 首次存储文档的日期
    md5: string;
    length: number; // 文档大小
    contentType?: string; // 文件有效的MIME类型
    aliases?: string[]; // 别名数组
    metadata?: any;
}

interface IChunkSchema {
    _id: mongoose.Types.ObjectId; // 块的唯一id
    files_id: mongoose.Types.ObjectId; // 对应files中的唯一id
    n: number; // 块的序号，从0开始
    data: Binary; // 块的数据
}

const DBName = 'file_db'; // GridFS集合名称
const FileDBName = 'file_db.files';// GridFS文件集合名称
const ChunkDBName = 'file_db.chunks';// GridFS块集合名称

export class GridFs{
    private static _gridfs: GridFs = null;
    static getBucket(){
        if(!GridFs._gridfs){
            GridFs._gridfs = new GridFs();
        }
        return GridFs._gridfs;
    }

    private bucket: GridFSBucket;
    private db: Db;
    private constructor(){
        this.db = mongoose.connection.db;
        this.bucket = new mongoose.mongo.GridFSBucket(this.db, {
            bucketName: DBName
        });
    }

    findFileById(id: string): Promise<any>{
        return new Promise<any>((resolve) => {
            let readStream = this.bucket.openDownloadStream(mongoose.Types.ObjectId(id)),
                data = [];
            readStream.on('data', (chunk) => {
                data.push(chunk);
            });
            readStream.on('end', (chunk) => {
                resolve(Buffer.concat(data));
            });
        })
    }

    async checkFile(file: CustomFile): Promise<IFileSchema>{
        let md5;
        try{
            md5 = await md5File(file);
        }catch (e) {
            return null;
        }
        try{
            return await this.db.collection(FileDBName).findOne({md5});
        }catch (e) {
            return null;
        }
    }

    async upload(file: CustomFile): Promise<IFileSchema>{
        // 验证文件是否上传过
        let res = await this.checkFile(file);
        if(res){
            return res;
        }
        return new Promise((resolve, reject) => {
            // 创建文件可读流上传文件
            fs.createReadStream(file.path)
                .pipe(this.bucket.openUploadStream(file.name, {
                    contentType: file.type
                }))
                .on('error', (err) => {
                    reject(err);
                })
                .on('finish', (res: IFileSchema) => {
                    resolve(res);
                });
        })
    }


}




