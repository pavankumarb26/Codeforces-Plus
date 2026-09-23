import { UserSetting } from '../models/UserSetting.js';
import { getIsMongoConnected } from '../config/db.js';
import { memoryStore } from '../utils/memoryStore.js';

export const getSettings = async (req, res) => {
  try {
    const { handle } = req.params;
    if (!handle) {
      return res.status(400).json({ success: false, message: 'Handle is required' });
    }
    const userHandle = handle.toLowerCase();

    if (getIsMongoConnected()) {
      let settings = await UserSetting.findOne({ handle: userHandle });
      if (!settings) {
        settings = await UserSetting.create({ handle: userHandle, theme: 'dark', itemsPerPage: 20 });
      }
      return res.json({ success: true, data: settings });
    } else {
      let settings = memoryStore.settings.get(userHandle);
      if (!settings) {
        settings = { handle: userHandle, theme: 'dark', itemsPerPage: 20, updatedAt: new Date() };
        memoryStore.settings.set(userHandle, settings);
      }
      return res.json({ success: true, data: settings });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch user settings' });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const { handle } = req.params;
    const { newHandle, theme, itemsPerPage } = req.body;
    const currentHandle = handle.toLowerCase();

    const updatedData = {
      handle: newHandle ? newHandle.toLowerCase() : currentHandle,
      theme: theme || 'dark',
      itemsPerPage: itemsPerPage ? Number(itemsPerPage) : 20,
      updatedAt: new Date()
    };

    if (getIsMongoConnected()) {
      const settings = await UserSetting.findOneAndUpdate(
        { handle: currentHandle },
        updatedData,
        { new: true, upsert: true }
      );
      return res.json({ success: true, data: settings });
    } else {
      memoryStore.settings.set(updatedData.handle, updatedData);
      if (currentHandle !== updatedData.handle) {
        memoryStore.settings.delete(currentHandle);
      }
      return res.json({ success: true, data: updatedData });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to update settings' });
  }
};
