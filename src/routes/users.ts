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
                response.status(404).send({reponse : false, content :{message: "Something went wrong", type : error.errmsg}})
            }).then(user =>{
                //TODO: remove Password param
                return response.status(200).send({reponse : true, content : user});
            });
        }catch(error){
            console.error(error);
        }
    }

    async validateUser(request : Request, response : Response){

        try{
            const {userName, password} = request.body;
            await User.findOne({userName, password}).catch(error=>{
                console.error(error);
                return response.status(404).send({reponse : false, content : "Something went wrong"});
            }).then(user=>{
                //TODO: remove Password param
                response.status(200).send({response : true, content : user});
            });
        }catch(error){
            console.error(error);
        }
    }

    async getUsers(request : Request, response : Response){
        await User.find().catch(error =>{
            console.error(error);
            return response.status(404).send({response: false, content : "Something went wrong"});
        }).then(user =>{
            //TODO: remove Password param
            response.status(200).send({response : true, content : user});
        });

    }

    routes (){
        this.router.post('/createUser', this.createUser);
        this.router.post('/validateUser', this.validateUser);
        this.router.get('/getUser', this.getUsers);
    }
}

const userRoutes = new UserRoutes();
userRoutes.routes();

export default userRoutes.router;