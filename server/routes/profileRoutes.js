import express from 'express';
import { getProfile, getSubmissions, getRatingHistory } from '../controllers/profileController.js';

const router = express.Router();

router.get('/:handle', getProfile);
router.get('/:handle/submissions', getSubmissions);
router.get('/:handle/rating', getRatingHistory);

export default router;
