import { codeforcesService } from '../services/codeforcesService.js';

export const getUpcomingContests = async (req, res) => {
  try {
    const contests = await codeforcesService.getContests(false);
    const upcoming = contests
      .filter(c => c.phase === 'BEFORE')
      .sort((a, b) => a.startTimeSeconds - b.startTimeSeconds);

    res.json({
      success: true,
      count: upcoming.length,
      data: upcoming
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch upcoming contests' });
  }
};

export const getPastContests = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const contests = await codeforcesService.getContests(false);
    const past = contests
      .filter(c => c.phase === 'FINISHED')
      .sort((a, b) => b.startTimeSeconds - a.startTimeSeconds)
      .slice(0, limit);

    res.json({
      success: true,
      count: past.length,
      data: past
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch past contests' });
  }
};

export const getContestById = async (req, res) => {
  try {
    const { contestId } = req.params;
    const contests = await codeforcesService.getContests(false);
    const contest = contests.find(c => String(c.id) === String(contestId));

    if (!contest) {
      return res.status(404).json({ success: false, message: 'Contest not found' });
    }

    res.json({
      success: true,
      data: contest
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch contest details' });
  }
};
