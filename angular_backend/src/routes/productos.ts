import { ProductosController } from './../controller/ProductosController';
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/', ProductosController.getAll);

// Get one user
router.get('/:id', ProductosController.getById);

// Create a new user
router.post('/', ProductosController.new);

// Edit user
router.patch('/:id',  ProductosController.edit);

// Delete
router.delete('/:id', ProductosController.delete);

export default router;