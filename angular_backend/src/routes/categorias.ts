import {Router} from 'express';
import {categoriasController} from '../controller/categoriasController';

const router = Router();

// Obtener todas las categorias activadas
router.get('/listActivated', categoriasController.getAllActivated);
// Obtener todas las categorias desactivadas
router.get('/listDeactivated', categoriasController.getAllDeactivated);
// Obtener una categoria
router.get('/:id', categoriasController.getById);
// Crear una nueva categoria
router.post('/', categoriasController.save);
// Editar categoria
router.put('/:id/update', categoriasController.update);
// Eliminar una categoria
router.put('/:id/delete', categoriasController.logicalDelete);

router.put('/:id/assignProducts', categoriasController.assignProductos);
export default router;
