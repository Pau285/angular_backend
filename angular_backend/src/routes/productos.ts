import { ProductosController } from './../controller/ProductosController';
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/', ProductosController.getAll);

router.get('/listNull', ProductosController.getAllCategoriesNull);

// Get one user
router.get('/:id', ProductosController.getById);

// Get Category

// Assign Category
router.put('/:id/assignCategory', ProductosController.assignCategory);


router.put('/:id/activate', ProductosController.activateProducto);


// Create a new user
router.post('/', ProductosController.new);

// Edit user
router.patch('/:id',  ProductosController.edit);


// Delete
router.delete('/:id', ProductosController.delete);



export default router;
