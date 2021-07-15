import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { validate, Validate } from "class-validator";

export class UserController {
  static getAll = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find();

    if (users.length > 0) {
      res.send(users);
    } else {
      res.status(400).json({ message: "not results" });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = getRepository(User);

    try {
      const user = await userRepository.findOneOrFail(id);
      res.send(user);
    } catch (e) {
      res.status(400).json({ message: "not results" });
    }
  };

  static newUser =async (req: Request, res: Response) =>{
         const {nombre, rol, contraseña}=req.body;
         const user=new User();


         user.nombre=nombre;
         user.contraseña=contraseña;
         user.rol=rol;

         //validacion 

         const errors=await validate(user);
         if(errors.length>0){
             return res.status(400).json(errors);
         }
          //hash contraseña
         const userRepository=getRepository(User);

         try{
             await userRepository.save(user);
         }
         catch(e){
             return res.status(409).json({message:'el usuario ya existe'})
         }

         //todo ok 

         res.send('usuario creado');
  };

  static editUser=async (req: Request, res: Response) =>{
      let user;
      const {id}=req.params;
      const {nombre, rol}=req.body;

      const userRepository=getRepository(User);

    try{
        user=await userRepository.findOneOrFail(id);
    }
    catch(e){
        return res.status(404).json({message:'ususario no encontrado'});
    }

    user.nombre=nombre;
    user.rol=rol;

    const errors=await validate(user);
    if (errors.length>0){
    return res.status(400).json(errors);
    }
    try{
        await userRepository.save(user);

    }
    catch(e){
        return res.status(409).json({message:'nombre ya utilizado'})
    }

    res.status(201).json({mesagge:'usuario modificado'});
  };

static deleteUser=async (req: Request, res: Response) =>{
    const {id}=req.params;
    const userRepository=getRepository(User);
    let user:User;

    try{
        user=await userRepository.findOneOrFail(id);
    }
    catch(e){
   res.status(404).json({message:'usuario no encontrado'})
    }

    userRepository.delete(id);
    res.status(201).json({message: 'Usuario eliminado'});
}
}
export default UserController;
