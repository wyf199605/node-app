import {Cursor, MongoClient} from 'mongodb';
import {RouterContext} from "koa-router";
import {dbConfig} from "../../mongodb.config";

export async function loginRoute(ctx: RouterContext){
    try{
        let client: MongoClient = await MongoClient.connect(dbConfig.url);
        const db = client.db('test');
        const collection = db.collection('test');
        const cursor: Cursor = collection.find();
        cursor.forEach((doc) =>  {
            if (doc !== null) {
                console.dir(doc);
            }
        });

        console.log('Connected correctly to server.');
        try {
            await client.close();
        }catch (e) {
            console.log(e);
        }
        ctx.body = 'ok';
    }catch (e) {
        console.log(e);
        ctx.body = '插入失败';
    }
}
