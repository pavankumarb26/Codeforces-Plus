import mongoose from 'mongoose';

const userSettingSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  theme: {
    type: String,
    enum: ['dark', 'light'],
    default: 'dark'
  },
  itemsPerPage: {
    type: Number,
    default: 20
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const UserSetting = mongoose.models.UserSetting || mongoose.model('UserSetting', userSettingSchema);
