import { Router } from 'express';
import { mockVerifyPayment } from '../controllers/paymentController';
import { protect } from '../middlewares/auth';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment Verification and Processing
 */

/**
 * @swagger
 * /api/payments/mock-verify:
 *   post:
 *     summary: Verify a payment securely server-side
 *     tags: [Payments]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - appointmentId
 *               - paymentMethod
 *             properties:
 *               appointmentId:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment successful and appointment confirmed
 *       400:
 *         description: Invalid request or already paid
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized to pay for this appointment
 */
router.use(protect);
router.post('/mock-verify', mockVerifyPayment);

export default router;
