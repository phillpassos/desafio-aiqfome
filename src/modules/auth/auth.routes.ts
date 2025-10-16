import { Router } from 'express';
import AuthController from './auth.controller';

const router = Router();

router.post('/', AuthController.authorize);

export default router;