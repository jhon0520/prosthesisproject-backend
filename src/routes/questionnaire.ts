import {Router, Request, Response} from 'express';

import Questionnaire from '../models/questionnaire_model'

class PetRoutes {
    
    router : Router;

    constructor(){
        this.router = Router();
        this.routes;
    };

    async getInformation(request : Request, response : Response){

    }

    async createQuestionnaire(request : Request, response : Response){

    }

    routes (){
        this.router.get('/getInformation', this.getInformation);
        this.router.post('/createQuestionnaire', this.createQuestionnaire);
    }
}

const petRoutes = new PetRoutes();
petRoutes.routes();

export default petRoutes.router;