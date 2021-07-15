import { Router } from "express";
import { UserController } from "../controller/UserController";

const router=Router();

//Obtener todos los usuarios

router.get('/', UserController.getAll);
// ruta para obtener un usuario
router.get('/:id', UserController.getById);
//crear un nuevo usuario 
router.post('/', UserController.newUser);
//editar un usuario 
router.patch('/:id', UserController.editUser);
//eliminar un usuario 
router.delete('/:id', UserController.deleteUser);

export default router;
