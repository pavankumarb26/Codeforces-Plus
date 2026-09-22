import { codeforcesService } from '../services/codeforcesService.js';
import { calculateUserStats } from '../utils/statsCalculator.js';

export const getProfile = async (req, res) => {
  try {
    const { handle } = req.params;
    if (!handle) {
      return res.status(400).json({ success: false, message: 'Handle is required' });
    }

    const [userInfo, userRating, userSubmissions] = await Promise.all([
      codeforcesService.getUserInfo(handle).catch(() => null),
      codeforcesService.getUserRating(handle).catch(() => []),
      codeforcesService.getUserStatus(handle, 1, 1000).catch(() => [])
    ]);

    if (!userInfo) {
      return res.status(404).json({ success: false, message: `Codeforces user '${handle}' not found or API error.` });
    }

    const stats = calculateUserStats(userSubmissions);

    res.json({
      success: true,
      data: {
        info: userInfo,
        ratingHistory: userRating,
        stats
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Internal server error' });
  }
};

export const getSubmissions = async (req, res) => {
  try {
    const { handle } = req.params;
    const limit = parseInt(req.query.limit) || 100;
    const from = parseInt(req.query.from) || 1;

    const submissions = await codeforcesService.getUserStatus(handle, from, limit);
    res.json({
      success: true,
      data: submissions
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch user submissions' });
  }
};

export const getRatingHistory = async (req, res) => {
  try {
    const { handle } = req.params;
    const ratingHistory = await codeforcesService.getUserRating(handle);
    res.json({
      success: true,
      data: ratingHistory
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch user rating history' });
  }
};
