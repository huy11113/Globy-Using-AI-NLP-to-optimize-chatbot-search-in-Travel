import express from 'express';
import { getAllTours } from '../controllers/tourController.js';

const router = express.Router();

// Dòng này đảm bảo mọi request tới /api/tours sẽ được xử lý bởi getAllTours
router.route('/').get(getAllTours);

export default router;