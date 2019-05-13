import {model, Schema, Document, Model} from "mongoose";

interface IUsers{
    test: Function,
}

type UsersDoc = IUsers & Document;

interface UsersModel extends Model<UsersDoc>{
    findByName
}

const usersSchema = new Schema<IUsers>({
    username: String,
    password: String
});

usersSchema.method('test', function() {
this.username
})

usersSchema.statics.findByName = async function (username) {
    return this.find({username})
};

const Users = model<UsersDoc, UsersModel>('users', usersSchema);
Users.findByName();

let a = new Users({

});

