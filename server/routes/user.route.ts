import { Router } from 'express';
import { deleteUser, updateUser, getUser, updateAvatar } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router: Router = Router();

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/:id', verifyToken, getUser);
router.put('/update/avatar/:id', verifyToken, updateAvatar);

export default router;