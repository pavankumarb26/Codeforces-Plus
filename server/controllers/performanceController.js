import { codeforcesService } from '../services/codeforcesService.js';
import { calculateUserStats } from '../utils/statsCalculator.js';

export const getPerformanceStats = async (req, res) => {
  try {
    const { handle } = req.params;
    if (!handle) {
      return res.status(400).json({ success: false, message: 'Handle is required' });
    }

    const [userInfo, ratingHistory, submissions] = await Promise.all([
      codeforcesService.getUserInfo(handle).catch(() => null),
      codeforcesService.getUserRating(handle).catch(() => []),
      codeforcesService.getUserStatus(handle, 1, 1000).catch(() => [])
    ]);

    if (!userInfo) {
      return res.status(404).json({ success: false, message: `User '${handle}' not found` });
    }

    const stats = calculateUserStats(submissions);

    res.json({
      success: true,
      data: {
        handle: userInfo.handle,
        currentRating: userInfo.rating || null,
        maxRating: userInfo.maxRating || null,
        rank: userInfo.rank || null,
        maxRank: userInfo.maxRank || null,
        ratingHistory,
        stats
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to calculate performance stats' });
  }
};
