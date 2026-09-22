import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export const ErrorAlert = ({
  message = 'Failed to load Codeforces data. Please try again.',
  onRetry = null
}) => {
  return (
    <div className="flex items-start gap-3 p-4 bg-rose-950/30 border border-rose-800/40 rounded-xl text-rose-300">
      <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-rose-200 hover:text-white bg-rose-900/40 hover:bg-rose-900/60 px-2.5 py-1 rounded border border-rose-700/50 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry
          </button>
        )}
      </div>
    </div>
  );
};
