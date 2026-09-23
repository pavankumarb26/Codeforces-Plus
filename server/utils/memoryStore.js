// Fallback in-memory storage when MongoDB is not connected
export const memoryStore = {
  settings: new Map(), // key: handle (lowercase)
  savedProblems: []    // array of saved problem objects
};
