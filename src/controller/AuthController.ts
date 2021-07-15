import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";

class AuthController{
    static login = async(req:Request, res:Response)=>{
    const {nombre, contraseña}=req.body;
    if(!(nombre&&contraseña)){
        res.status(400).json({message:'nombre y contraseña son requeridos'})
    }
    const userRepository=getRepository(User);
    let user:User;
    try{
        user=await userRepository.findOneOrFail({where:{nombre}})
    }
    catch(e){
        return res.status(400).json({message:'usuario o contraseñas incorrectos'})
    }
    res.send(user);
    };
}
export default AuthController;