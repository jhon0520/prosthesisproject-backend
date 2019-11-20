import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    userName : {
        type : String
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