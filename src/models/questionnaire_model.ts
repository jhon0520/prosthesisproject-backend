import {Schema, model} from 'mongoose';

const QuestionnaireSchema = new Schema({
    date : {
        type : Date,
        default : Date.now()
    },
    personalID : {
        type : Number
    },
    age : {
        type : Number
    },
    gender : {
        type : String
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
    amputationCause : {
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

export default model('Questionnaire', QuestionnaireSchema);