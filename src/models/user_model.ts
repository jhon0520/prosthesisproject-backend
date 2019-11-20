import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    userName : {
        type : String,
        unique : true
    },
    password : {
        type : String
    },
    hospitalId : {
        type : Number
    },
    userType :{
        type : String,
        default : 'Deafault'
    }
});

export default model('User', UserSchema);