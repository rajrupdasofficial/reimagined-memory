const mongodb =require('mongoose');
const UserSchema = new mongodb.Schema({
    username: {type:String, unique:true},
    password: String,
},{timestamps:true});

export const UserModel = mongodb.model('User',UserSchema);