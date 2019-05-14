import {model, Schema, Document, Model} from "mongoose";

export interface IUser {
    password: string;
    username: string;
}

interface IUserConstruct extends IUser {

}

type UserDoc = IUserConstruct & Document;

interface IUserModel extends Model<UserDoc> {
    new(para: Partial<IUser>): UserDoc;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        index: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

export const User: IUserModel = model<UserDoc, IUserModel>('user', userSchema);

User.createIndexes((err) => {
    err && console.log(err);
});

