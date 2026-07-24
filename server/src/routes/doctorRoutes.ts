import { Router } from 'express';
import {
  getAllDoctors,
  getDoctorById,
  updateAvailability,
  getAvailableSlots
} from '../controllers/doctorController';
import { protect, restrictTo } from '../middlewares/auth';

const router = Router();

router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);
router.get('/:id/available-slots', getAvailableSlots);

router.put('/availability', protect, restrictTo('doctor'), updateAvailability);

export default router;
