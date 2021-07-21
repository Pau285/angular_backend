import { Router } from "express";
import AuthController from '../controller/AuthController';
import { checkJwt } from "../middelware/jwt";

const router=Router();

//Login 

router.post('/login', AuthController.login);

//cambiar contraseña

router.post('/change-password', [checkJwt], AuthController.changePassword);
export default router;