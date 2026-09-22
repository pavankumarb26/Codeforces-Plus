import mongoose from 'mongoose';

const savedProblemSchema = new mongoose.Schema({
  userHandle: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: true
  },
  problemId: {
    type: String,
    required: true
  },
  contestId: {
    type: Number,
    required: true
  },
  index: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number
  },
  tags: [{
    type: String
  }],
  url: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Composite unique index so a user cannot duplicate a saved problem
savedProblemSchema.index({ userHandle: 1, problemId: 1 }, { unique: true });

export const SavedProblem = mongoose.models.SavedProblem || mongoose.model('SavedProblem', savedProblemSchema);
