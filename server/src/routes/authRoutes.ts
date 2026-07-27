import express from 'express';
import { register, login, logoutUser, getMe, requestProfileUpdate, verifyProfileUpdate } from '../controllers/authController';
import { protect } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validateRequest';
import { sendOtpSchema, verifyOtpSchema } from '../schemas/authSchema'; // I will just remove the schema validations for now to simplify, or keep them but they are for otp.
// We can just omit validateRequest for now as we have basic validation in controller.

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and User Management
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user with password
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/logout', logoutUser);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current authenticated user
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Returns the user object
 *       401:
 *         description: Not authenticated
 */
router.use(protect);
router.get('/me', getMe);
router.post('/profile/request-update', requestProfileUpdate);
router.post('/profile/verify-update', verifyProfileUpdate);

export default router;
