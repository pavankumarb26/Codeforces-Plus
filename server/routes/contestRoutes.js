import express from 'express';
import { getUpcomingContests, getPastContests, getContestById } from '../controllers/contestController.js';

const router = express.Router();

router.get('/upcoming', getUpcomingContests);
router.get('/past', getPastContests);
router.get('/:contestId', getContestById);

export default router;
