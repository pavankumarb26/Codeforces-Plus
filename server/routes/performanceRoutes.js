import express from 'express';
import { getPerformanceStats } from '../controllers/performanceController.js';

const router = express.Router();

router.get('/:handle', getPerformanceStats);

export default router;
