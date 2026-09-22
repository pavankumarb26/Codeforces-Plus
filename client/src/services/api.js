import axios from 'axios';

const api = axios.create({
  baseURL: 'https://codeforces-plus.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const profileApi = {
  getProfile: (handle) => api.get(`/profile/${handle}`),
  getSubmissions: (handle, limit = 100, from = 1) => api.get(`/profile/${handle}/submissions?limit=${limit}&from=${from}`),
  getRatingHistory: (handle) => api.get(`/profile/${handle}/rating`)
};

export const contestApi = {
  getUpcoming: () => api.get('/contests/upcoming'),
  getPast: (limit = 50) => api.get(`/contests/past?limit=${limit}`),
  getById: (id) => api.get(`/contests/${id}`)
};

export const problemApi = {
  getProblems: (params = {}) => api.get('/problems', { params }),
  getByContestAndIndex: (contestId, index) => api.get(`/problems/${contestId}/${index}`)
};

export const performanceApi = {
  getStats: (handle) => api.get(`/performance/${handle}`)
};

export const savedApi = {
  getSaved: (handle) => api.get(`/saved/${handle}`),
  saveProblem: (problemData) => api.post('/saved', problemData),
  removeSaved: (handle, problemId) => api.delete(`/saved/${handle}/${problemId}`)
};

export const settingsApi = {
  getSettings: (handle) => api.get(`/settings/${handle}`),
  updateSettings: (handle, data) => api.put(`/settings/${handle}`, data)
};

export default api;
