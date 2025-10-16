import { Router } from 'express';
import authRoutes from './modules/auth/auth.routes';
import clienteRoutes from './modules/cliente/cliente.routes';
import favoritosRoutes from './modules/favoritos/favoritos.routes';


const router = Router();

router.use('/login', authRoutes);
router.use('/clientes', clienteRoutes);
router.use('/favoritos', favoritosRoutes);

export default router;


