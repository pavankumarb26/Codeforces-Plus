import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Trophy,
  Code2,
  History,
  TrendingUp,
  Bookmark,
  BookOpen,
  Settings,
  User,
  ExternalLink,
  X
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/contests', label: 'Contests', icon: Trophy },
  { path: '/problems', label: 'Problems', icon: Code2 },
  { path: '/submissions', label: 'Submissions', icon: History },
  { path: '/performance', label: 'Performance', icon: TrendingUp },
  { path: '/saved', label: 'Saved Problems', icon: Bookmark },
  { path: '/learn', label: 'Learn', icon: BookOpen },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { handle } = useUser();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-dark-card border-r border-dark-border flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo / Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-dark-border">
          <NavLink to="/" className="flex items-center gap-3 group">
            <img
              src="/logo/codeforces-plus-icon.png"
              alt="Codeforces Plus Logo"
              className="h-9 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-base tracking-tight text-white block leading-none">
                Codeforces
              </span>
              <span className="text-[11px] font-bold font-mono text-purple-400 tracking-wider block mt-0.5">
                Plus
              </span>
            </div>
          </NavLink>
          <button
            className="lg:hidden p-1 text-slate-400 hover:text-white"
            onClick={() => setMobileOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-sky-500/10 text-sky-300 border border-sky-500/20 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-dark-hover'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* External Codeforces link */}
        <div className="p-4 border-t border-dark-border">
          <a
            href={`https://codeforces.com/profile/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-lg bg-dark-bg/60 border border-dark-border text-xs text-slate-400 hover:text-sky-300 hover:border-sky-500/30 transition-all"
          >
            <span className="truncate font-mono">@{handle}</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </a>
        </div>
      </aside>
    </>
  );
};
