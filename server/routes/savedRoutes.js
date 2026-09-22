import express from 'express';
import { getSavedProblems, saveProblem, removeSavedProblem } from '../controllers/savedController.js';

const router = express.Router();

router.get('/:handle', getSavedProblems);
router.post('/', saveProblem);
router.delete('/:handle/:problemId', removeSavedProblem);

export default router;
