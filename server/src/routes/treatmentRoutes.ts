import { Router } from 'express';
import {
  getTreatments,
  getTreatmentBySlug,
  createTreatment,
  updateTreatment,
  deleteTreatment
} from '../controllers/treatmentController';
import { protect, restrictTo } from '../middlewares/auth';

const router = Router();

router.get('/', getTreatments);
router.get('/:slug', getTreatmentBySlug);

router.use(protect, restrictTo('admin'));
router.post('/', createTreatment);
router.put('/:id', updateTreatment);
router.delete('/:id', deleteTreatment);

export default router;
