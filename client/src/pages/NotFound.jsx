import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-4">
      <div className="p-4 bg-sky-500/10 border border-sky-500/20 rounded-2xl text-sky-400">
        <AlertCircle className="w-12 h-12" />
      </div>

      <h1 className="text-4xl font-extrabold font-heading text-white tracking-tight">404 - Page Not Found</h1>
      <p className="text-sm text-slate-400 max-w-md font-mono">
        The route you requested does not exist on Codeforces Platform command center.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-colors"
      >
        <Home className="w-4 h-4" /> Back to Dashboard
      </Link>
    </div>
  );
};
