import express from 'express';
import rateLimit from 'express-rate-limit';
import { register, login, logoutUser, getMe, requestProfileUpdate, verifyProfileUpdate, sendOtp, verifyOtp } from '../controllers/authController';
import { z } from 'zod';
import { validateRequest } from '../middlewares/validateRequest';
import { protect } from '../middlewares/auth';

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

const sendOtpSchema = z.object({
  identifier: z.string().min(3, 'Email or phone number is required'),
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 OTP requests per window
  message: 'Too many OTP requests from this IP, please try again after 15 minutes',
});

/**
 * @swagger
 * /api/auth/send-otp:
 *   post:
 *     summary: Send OTP for passwordless login
 *     tags: [Auth]
 */
router.post('/send-otp', authLimiter, validateRequest(sendOtpSchema), sendOtp);

const verifyOtpSchema = z.object({
  identifier: z.string().min(3, 'Email or phone number is required'),
  otp: z.string().length(4, 'OTP must be exactly 4 digits'),
});

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP for passwordless login
 *     tags: [Auth]
 */
router.post('/verify-otp', authLimiter, validateRequest(verifyOtpSchema), verifyOtp);

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
router.get('/me', getMe);

router.use(protect);
router.post('/profile/request-update', requestProfileUpdate);
router.post('/profile/verify-update', verifyProfileUpdate);

export default router;
