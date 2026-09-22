import React, { useState } from 'react';
import { Menu, Search, User, Bookmark, ExternalLink } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export const Header = ({ setMobileOpen }) => {
  const { handle, changeHandle, savedProblemsList } = useUser();
  const [isEditingHandle, setIsEditingHandle] = useState(false);
  const [handleInput, setHandleInput] = useState(handle);
  const navigate = useNavigate();

  const handleHandleSubmit = (e) => {
    e.preventDefault();
    if (handleInput.trim()) {
      changeHandle(handleInput.trim());
      setIsEditingHandle(false);
    }
  };

  return (
    <header className="h-16 bg-dark-card/80 backdrop-blur-md border-b border-dark-border sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-dark-hover"
        >
          <Menu className="w-5 h-5" />
        </button>

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
        {isEditingHandle ? (
          <form onSubmit={handleHandleSubmit} className="flex items-center gap-1">
            <input
              type="text"
              value={handleInput}
              onChange={(e) => setHandleInput(e.target.value)}
              className="bg-dark-bg border border-sky-500/50 rounded-lg px-2.5 py-1 text-xs font-mono text-white focus:outline-none w-36"
              placeholder="Codeforces handle"
              autoFocus
            />
            <button
              type="submit"
              className="px-2 py-1 bg-sky-500 text-slate-950 font-semibold rounded text-xs hover:bg-sky-400 transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditingHandle(false)}
              className="px-2 py-1 text-slate-400 hover:text-white text-xs"
            >
              Cancel
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsEditingHandle(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-bg border border-dark-border hover:border-slate-600 text-xs font-mono text-slate-200 transition-all"
            title="Click to switch handle"
          >
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-white">@{handle}</span>
            <span className="text-[10px] text-sky-400 hover:underline ml-1">Change</span>
          </button>
        )}
      </div>
    </header>
  );
};
