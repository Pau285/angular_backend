import { Router } from 'express';
import auth from './auth';
import user from './user';
import productos from './productos';
import categorias from './categorias';

const routes = Router();
routes.use('/auth', auth);
routes.use ('/users', user);
routes.use ('/productos', productos);
routes.use('/categorias', categorias);

export default routes;
