import React from 'react';
import { Menu, User, Bookmark } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export const Header = ({ setMobileOpen }) => {
  const { handle, openUsernameModal, savedProblemsList } = useUser();
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-dark-card/80 backdrop-blur-md border-b border-dark-border sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-dark-hover"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Compact Brand */}
        <div className="flex lg:hidden items-center gap-2">
          <img
            src="/logo/codeforces-plus-icon.png"
            alt="Codeforces Plus Logo"
            className="h-7 w-auto object-contain"
          />
          <span className="font-heading font-bold text-sm text-white">
            Codeforces <span className="text-purple-400">Plus</span>
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>LIVE CODEFORCES SYNC</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Saved Count Badge */}
        <button
          onClick={() => navigate('/saved')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-bg border border-dark-border text-xs text-slate-300 hover:text-sky-400 hover:border-sky-500/30 transition-all"
        >
          <Bookmark className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-mono font-semibold">{savedProblemsList.length}</span>
          <span className="hidden md:inline text-slate-400">Saved</span>
        </button>

        {/* Handle Badge / Switcher */}
        <button
          onClick={openUsernameModal}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-bg border border-dark-border hover:border-sky-500/40 text-xs font-mono text-slate-200 transition-all cursor-pointer"
          title="Click to change Codeforces username"
        >
          <User className="w-3.5 h-3.5 text-sky-400" />
          {handle ? (
            <>
              <span className="font-semibold text-white">@{handle}</span>
              <span className="text-[10px] text-sky-400 font-sans hover:underline ml-1">Change</span>
            </>
          ) : (
            <span className="font-semibold text-sky-400">Enter Username</span>
          )}
        </button>
      </div>
    </header>
  );
};
