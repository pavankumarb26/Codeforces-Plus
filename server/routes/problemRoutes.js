import express from 'express';
import { getProblems, getProblemByContestAndIndex } from '../controllers/problemController.js';

const router = express.Router();

router.get('/', getProblems);
router.get('/:contestId/:index', getProblemByContestAndIndex);

export default router;
