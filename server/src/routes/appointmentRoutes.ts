import { Router } from 'express';
import {
  createAppointment,
  getMyPatientAppointments,
  getDoctorSchedule,
  cancelAppointment,
  updateAppointmentStatus,
  getBookedSlots,
  getAllSystemAppointments
} from '../controllers/appointmentController';
import { protect, restrictTo } from '../middlewares/auth';
import { upload } from '../middlewares/upload';

const router = Router();

router.use(protect);

router.get('/booked-slots', getBookedSlots);
router.get('/all', restrictTo('doctor', 'admin'), getAllSystemAppointments);

router.post('/', restrictTo('patient'), upload.single('medicalReport'), createAppointment);
router.get('/my-appointments', restrictTo('patient'), getMyPatientAppointments);
router.get('/doctor-schedule', restrictTo('doctor'), getDoctorSchedule);
router.patch('/:id/cancel', cancelAppointment);
router.patch('/:id/status', restrictTo('doctor', 'admin'), updateAppointmentStatus);

export default router;
