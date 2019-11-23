import {Router, Request, Response} from 'express';

import Questionnaire from '../models/questionnaire_model';

class QuestionnaireRoutes {
    
    router : Router;

    constructor(){
        this.router = Router();
        this.routes;
    };

    async getInformation(request : Request, response : Response){

        const questionnaire = await Questionnaire.find();

        if (questionnaire == null) {
            return response.status(404).send({response : false, content : "Something went wrong"});
        }

        return response.status(200).send({response : true, content : questionnaire});

    }

    async createQuestionnaire(request : Request, response : Response){
        
        try{
            const { personalID,
                    age,
                    gender,
                    departament,
                    housingArea,
                    amputationType,
                    classification,
                    zone,
                    prosthesisType,
                    activityLevel,
                    time,
                    question1,
                    question2
            } = request.body;

            const questionnaire = await new Questionnaire(
                {   
                    personalID,
                    age,
                    gender,
                    departament,
                    housingArea,
                    amputationType,
                    classification,
                    zone,
                    prosthesisType,
                    activityLevel,
                    time,
                    question1,
                    question2
                });

            if (questionnaire == null) {
                return response.status(404).send({response : false, content : "Something went wrong"});
            }

            const newQuestionnaire = await questionnaire.save();

            if (newQuestionnaire == null) {
                return response.status(404).send({response : false, content : "Something went wrong"});
            }

            return response.status(200).send({response : true, content : newQuestionnaire});
            
        }catch(error){
            console.error(error);
        }
    }

    routes (){
        this.router.get('/getInformation', this.getInformation);
        this.router.post('/createQuestionnaire', this.createQuestionnaire);
    }
}

const questionnaireRoutes = new QuestionnaireRoutes();
questionnaireRoutes.routes();

export default questionnaireRoutes.router;