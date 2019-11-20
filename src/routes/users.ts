import {Router, Request, Response} from 'express';

import User from '../models/user_model';
import connect from '../database';

class UserRoutes {
    
    router : Router;

    constructor(){
        this.router = Router();
        this.routes;
    };

    async createUser (request : Request, response : Response){
        
        try{
            const { userName, password, hospitalId, userType } = request.body;
            const newUser = await new User({userName, password, hospitalId, userType});

            await newUser.save().catch(error =>{
                console.error(error);
                response.status(404).send({reponse : false, content : "Something went wrong"})
            }).then(()=>{
                delete newUser.toJSON().password;
                return response.status(200).send({reponse : true, content : newUser});
            });
        }catch(error){
            console.error(error);
        }
    }

    async validateUser(request : Request, response : Response){

        try{
            const {userName, password} = request.body;
            const user = await User.findOne({userName, password}).catch(error=>{
                console.error(error);
                return response.status(404).send({reponse : false, content : "Something went wrong"});
            }).then((user)=>{
                console.log(user);
                response.status(200).send({response : true});
            });
        }catch(error){
            console.error(error);
        }

    }

    routes (){
        this.router.post('/createUser', this.createUser);
        this.router.post('/validateUser', this.validateUser);
    }
}

const userRoutes = new UserRoutes();
userRoutes.routes();

export default userRoutes.router;