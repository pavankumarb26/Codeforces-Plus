import React, { createContext, useContext, useState, useEffect } from 'react';
import { settingsApi, savedApi } from '../services/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [handle, setHandle] = useState(() => {
    return localStorage.getItem('cf_user_handle') || 'pavankumar2614';
  });
  const [savedProblemsMap, setSavedProblemsMap] = useState(new Map());
  const [loadingSaved, setLoadingSaved] = useState(false);
  const [theme, setTheme] = useState('dark');

  // Load saved problems when handle changes
  const refreshSavedProblems = async (currentHandle = handle) => {
    if (!currentHandle) return;
    setLoadingSaved(true);
    try {
      const res = await savedApi.getSaved(currentHandle);
      if (res.data?.success && Array.isArray(res.data.data)) {
        const map = new Map();
        res.data.data.forEach(item => {
          map.set(item.problemId, item);
        });
        setSavedProblemsMap(map);
      }
    } catch (err) {
      console.error('Failed to load saved problems:', err);
    } finally {
      setLoadingSaved(false);
    }
  };

  useEffect(() => {
    if (handle) {
      localStorage.setItem('cf_user_handle', handle);
      refreshSavedProblems(handle);
    }
  }, [handle]);

  const changeHandle = (newHandle) => {
    if (!newHandle || newHandle.trim() === '') return;
    const cleanHandle = newHandle.trim();
    setHandle(cleanHandle);
    localStorage.setItem('cf_user_handle', cleanHandle);
  };

  const isProblemSaved = (problemId) => {
    return savedProblemsMap.has(problemId);
  };

  const toggleSaveProblem = async (problemData) => {
    const problemId = `${problemData.contestId}-${problemData.index}`;
    if (isProblemSaved(problemId)) {
      // Remove
      try {
        await savedApi.removeSaved(handle, problemId);
        setSavedProblemsMap(prev => {
          const next = new Map(prev);
          next.delete(problemId);
          return next;
        });
        return false;
      } catch (err) {
        console.error('Failed to remove saved problem:', err);
        throw err;
      }
    } else {
      // Add
      try {
        const payload = {
          userHandle: handle,
          contestId: problemData.contestId,
          index: problemData.index,
          name: problemData.name,
          rating: problemData.rating,
          tags: problemData.tags || []
        };
        const res = await savedApi.saveProblem(payload);
        if (res.data?.success) {
          setSavedProblemsMap(prev => {
            const next = new Map(prev);
            next.set(problemId, res.data.data);
            return next;
          });
          return true;
        }
      } catch (err) {
        console.error('Failed to save problem:', err);
        throw err;
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        handle,
        changeHandle,
        savedProblemsMap,
        savedProblemsList: Array.from(savedProblemsMap.values()),
        loadingSaved,
        refreshSavedProblems,
        isProblemSaved,
        toggleSaveProblem,
        theme,
        setTheme
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
