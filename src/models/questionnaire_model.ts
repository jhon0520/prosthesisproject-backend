import {Schema, model} from 'mongoose';

const PetSchema = new Schema({
    date : {
        type : Date,
        dafault : Date.now()
    },
    personalID : {
        type : Number
    },
    gender : {
        type : String
    },
    age : {
        type : Number
    },
    departament : {
        type : String
    },
    housingArea : {
        type : String
    },
    amputationType : {
        type : String
    },
    classification : {
        type : String
    },
    zone : {
        type : String
    },
    prosthesisType : {
        type : String
    },
    activityLevel : {
        type : String
    },
    time : {
        type : String
    },
    question1 : {
        type : String
    },
    question2 : {
        type : String
    }
});

export default model('Pet', PetSchema);