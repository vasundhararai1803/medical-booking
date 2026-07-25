import express from 'express';
import { sendOtp, logoutUser, getMe, verifyOtp, requestProfileUpdate, verifyProfileUpdate } from '../controllers/authController';
import { protect } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validateRequest';
import { sendOtpSchema, verifyOtpSchema } from '../schemas/authSchema';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and User Management
 */

/**
 * @swagger
 * /api/auth/send-otp:
 *   post:
 *     summary: Send 4-digit OTP for login or registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *             properties:
 *               identifier:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */
router.post('/send-otp', validateRequest(sendOtpSchema), sendOtp);

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify 4-digit OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *               - code
 *             properties:
 *               identifier:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid OTP
 */
router.post('/verify-otp', validateRequest(verifyOtpSchema), verifyOtp);

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
