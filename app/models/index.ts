import * as mongoose from "mongoose";
import {ConnectionOptions} from "mongoose";

const uri = 'mongodb://localhost:27017';
const config: ConnectionOptions = {
    autoIndex: false,
    dbName: 'test',
    useNewUrlParser: true
};

const mongooseInit = () => {
    mongoose.connect(uri, config);
    let db = mongoose.connection;

    db.on('error', () => {
        console.error('数据库连接失败');
    });
    db.on('open', () => {
        console.info('数据库连接成功');
    });
};

mongooseInit();
