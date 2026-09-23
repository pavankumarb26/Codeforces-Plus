import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { UsernameModal } from '../common/UsernameModal';
import { useUser } from '../../context/UserContext';

export const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { handle, isUsernameModalOpen, changeHandle, closeUsernameModal } = useUser();

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 font-body flex">
      <UsernameModal
        isOpen={isUsernameModalOpen}
        handle={handle}
        onSave={changeHandle}
        onClose={closeUsernameModal}
      />

      {/* Persistent Sidebar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        <Header setMobileOpen={setMobileOpen} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
