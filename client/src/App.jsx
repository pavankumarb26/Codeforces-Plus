import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { MainLayout } from './components/layout/MainLayout';

import { Dashboard } from './pages/Dashboard';
import { Contests } from './pages/Contests';
import { Problems } from './pages/Problems';
import { Submissions } from './pages/Submissions';
import { Performance } from './pages/Performance';
import { Saved } from './pages/Saved';
import { Learn } from './pages/Learn';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="contests" element={<Contests />} />
            <Route path="contests/upcoming" element={<Contests />} />
            <Route path="contests/past" element={<Contests />} />
            <Route path="problems" element={<Problems />} />
            <Route path="submissions" element={<Submissions />} />
            <Route path="performance" element={<Performance />} />
            <Route path="saved" element={<Saved />} />
            <Route path="learn" element={<Learn />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
