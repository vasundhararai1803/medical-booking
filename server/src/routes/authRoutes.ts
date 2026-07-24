import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/authController';
import { protect } from '../middlewares/auth';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.use(protect);
router.get('/me', getMe);

export default router;
