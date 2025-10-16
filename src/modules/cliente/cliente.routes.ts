import { Router } from 'express';
import ClienteController from './cliente.controller';

const router = Router();

router.post('/', ClienteController.create);
router.get('/', ClienteController.get);
router.get('/email/:email', ClienteController.getByEmail);
router.put('/:id', ClienteController.update);
router.delete('/:id', ClienteController.delete);

export default router;