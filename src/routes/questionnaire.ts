import {Router, Request, Response} from 'express';

import Questionnaire from '../models/questionnaire_model';
import fs from 'fs';

class QuestionnaireRoutes {
    
    router : Router;

    constructor(){
        this.router = Router();
        this.routes;
    };

    async getInformation(request : Request, response : Response){

        const questionnaire = await Questionnaire.find().lean();

        if (questionnaire == null) {
            return response.status(404).send({response : false, content : "Something went wrong"});
        }

        var text : String = 'Fecha;Cedula;Genero;Edad;Departamento;Zona vivienda;Tipo de Amputacion;Causa de Amputacion;Clasificacion;Zona;Tipo de protesis;Nivel de actividad;Tiempo desde la amputacion hasta la protetización;¿Realizó reabilitación pre-protesica?;¿Realizó reabilitación post-protesica?\n';
        
        // console.log(questionnaire.length);
        for (let index = 0; index < questionnaire.length; index++) {
            text += questionnaire[index].date + ';';
            text += questionnaire[index].personalID + ';';
            text += questionnaire[index].gender + ';';
            text += questionnaire[index].age + ';';
            text += questionnaire[index].departament + ';';
            text += questionnaire[index].housingArea + ';';
            text += questionnaire[index].amputationType + ';';
            text += questionnaire[index].amputationamputationCause + ';';
            text += questionnaire[index].classification + ';';
            text += questionnaire[index].zone + ';';
            text += questionnaire[index].prosthesisType + ';';
            text += questionnaire[index].activityLevel + ';';
            text += questionnaire[index].time + ';';
            text += questionnaire[index].question1 + ';';
            text += questionnaire[index].question2 + '\n';
        }

        fs.writeFile( __dirname + '/../public/prueba.csv', text, error =>{
            if(error) {
                console.log('error: ', error);
              }
        });

        // console.log(archivo);

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