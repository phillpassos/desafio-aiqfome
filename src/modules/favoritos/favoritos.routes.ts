import { Router } from 'express';
import favoritosController from './favoritos.controller';

const router = Router();

router.post('/cliente/:idCliente', favoritosController.create);
router.get('/cliente/:idCliente', favoritosController.get);
router.delete('/:id', favoritosController.delete);

export default router;
