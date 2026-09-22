import axios from 'axios';
import { cache } from '../config/cache.js';

const CF_BASE_URL = 'https://codeforces.com/api';

const axiosInstance = axios.create({
  baseURL: CF_BASE_URL,
  timeout: 12000,
  headers: {
    'User-Agent': 'CodeforcesPlatform/1.0'
  }
});

// Helper for making cached requests
const fetchWithCache = async (endpoint, cacheKey, ttlSeconds = 300) => {
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axiosInstance.get(endpoint);
    if (response.data && response.data.status === 'OK') {
      const result = response.data.result;
      cache.set(cacheKey, result, ttlSeconds);
      return result;
    } else {
      const errorMsg = response.data?.comment || 'Codeforces API error';
      throw new Error(errorMsg);
    }
  } catch (error) {
    if (error.response?.data?.comment) {
      throw new Error(error.response.data.comment);
    }
    throw new Error(error.message || 'Failed to communicate with Codeforces API');
  }
};

export const codeforcesService = {
  // Get user profile info
  getUserInfo: async (handle) => {
    const cacheKey = `user_info_${handle.toLowerCase()}`;
    const result = await fetchWithCache(`/user.info?handles=${encodeURIComponent(handle)}`, cacheKey, 180);
    return Array.isArray(result) && result.length > 0 ? result[0] : null;
  },

  // Get user submissions status
  getUserStatus: async (handle, from = 1, count = 1000) => {
    const cacheKey = `user_status_${handle.toLowerCase()}_${from}_${count}`;
    return await fetchWithCache(`/user.status?handle=${encodeURIComponent(handle)}&from=${from}&count=${count}`, cacheKey, 120);
  },

  // Get user rating history
  getUserRating: async (handle) => {
    const cacheKey = `user_rating_${handle.toLowerCase()}`;
    return await fetchWithCache(`/user.rating?handle=${encodeURIComponent(handle)}`, cacheKey, 300);
  },

  // Get all contests
  getContests: async (gym = false) => {
    const cacheKey = `contests_list_gym_${gym}`;
    return await fetchWithCache(`/contest.list?gym=${gym}`, cacheKey, 600);
  },

  // Get problem set
  getProblemSet: async (tags = '') => {
    const cacheKey = `problemset_${tags || 'all'}`;
    const url = tags ? `/problemset.problems?tags=${encodeURIComponent(tags)}` : '/problemset.problems';
    return await fetchWithCache(url, cacheKey, 600);
  }
};
