import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';

const router = express.Router();

router.get('/:handle', getSettings);
router.put('/:handle', updateSettings);

export default router;
