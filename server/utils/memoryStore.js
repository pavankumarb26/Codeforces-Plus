// Fallback in-memory storage when MongoDB is not connected
export const memoryStore = {
  settings: new Map(), // key: handle (lowercase)
  savedProblems: []    // array of saved problem objects
};

// Seed default settings if empty
memoryStore.settings.set('pavankumar2614', {
  handle: 'pavankumar2614',
  theme: 'dark',
  itemsPerPage: 20,
  updatedAt: new Date()
});
