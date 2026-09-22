import { SavedProblem } from '../models/SavedProblem.js';
import { getIsMongoConnected } from '../config/db.js';
import { memoryStore } from '../utils/memoryStore.js';

export const getSavedProblems = async (req, res) => {
  try {
    const { handle } = req.params;
    const userHandle = handle.toLowerCase();

    if (getIsMongoConnected()) {
      const saved = await SavedProblem.find({ userHandle }).sort({ createdAt: -1 });
      return res.json({ success: true, count: saved.length, data: saved });
    } else {
      const saved = memoryStore.savedProblems
        .filter(item => item.userHandle === userHandle)
        .sort((a, b) => b.createdAt - a.createdAt);
      return res.json({ success: true, count: saved.length, data: saved });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch saved problems' });
  }
};

export const saveProblem = async (req, res) => {
  try {
    const { userHandle, contestId, index, name, rating, tags } = req.body;

    if (!userHandle || !contestId || !index || !name) {
      return res.status(400).json({ success: false, message: 'Missing required problem parameters' });
    }

    const handle = userHandle.toLowerCase();
    const problemId = `${contestId}-${index}`;
    const url = `https://codeforces.com/problemset/problem/${contestId}/${index}`;

    if (getIsMongoConnected()) {
      const existing = await SavedProblem.findOne({ userHandle: handle, problemId });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Problem is already saved' });
      }

      const savedItem = await SavedProblem.create({
        userHandle: handle,
        problemId,
        contestId: Number(contestId),
        index,
        name,
        rating: rating ? Number(rating) : undefined,
        tags: Array.isArray(tags) ? tags : [],
        url,
        createdAt: new Date()
      });

      return res.status(201).json({ success: true, data: savedItem });
    } else {
      const exists = memoryStore.savedProblems.some(item => item.userHandle === handle && item.problemId === problemId);
      if (exists) {
        return res.status(400).json({ success: false, message: 'Problem is already saved' });
      }

      const newItem = {
        _id: `mem_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        userHandle: handle,
        problemId,
        contestId: Number(contestId),
        index,
        name,
        rating: rating ? Number(rating) : undefined,
        tags: Array.isArray(tags) ? tags : [],
        url,
        createdAt: new Date()
      };

      memoryStore.savedProblems.push(newItem);
      return res.status(201).json({ success: true, data: newItem });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to save problem' });
  }
};

export const removeSavedProblem = async (req, res) => {
  try {
    const { handle, problemId } = req.params;
    const userHandle = handle.toLowerCase();

    if (getIsMongoConnected()) {
      const deleted = await SavedProblem.findOneAndDelete({ userHandle, problemId });
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Saved problem not found' });
      }
      return res.json({ success: true, message: 'Problem removed from saved list' });
    } else {
      const index = memoryStore.savedProblems.findIndex(
        item => item.userHandle === userHandle && item.problemId === problemId
      );
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Saved problem not found' });
      }
      memoryStore.savedProblems.splice(index, 1);
      return res.json({ success: true, message: 'Problem removed from saved list' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to remove saved problem' });
  }
};
