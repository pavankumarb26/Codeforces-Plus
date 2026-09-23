import React, { useState, useEffect } from 'react';
import { User, AlertCircle, CheckCircle2, Loader2, Sparkles, X } from 'lucide-react';
import { profileApi } from '../../services/api';

export const UsernameModal = ({ isOpen, handle, onSave, onClose }) => {
  const [inputHandle, setInputHandle] = useState(handle || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setInputHandle(handle || '');
    setError('');
  }, [handle, isOpen]);

  if (!isOpen && handle) {
    return null;
  }

  const isFirstTime = !handle;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanHandle = inputHandle.trim();
    if (!cleanHandle) {
      setError('Please enter a Codeforces username.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Validate handle with Codeforces API
      const res = await profileApi.getProfile(cleanHandle);
      if (res.data?.success && res.data?.data?.info) {
        onSave(res.data.data.info.handle || cleanHandle);
        setError('');
      } else {
        setError(`Codeforces user '${cleanHandle}' not found. Please verify spelling.`);
      }
    } catch (err) {
      const msg = err.response?.data?.message || `Codeforces user '${cleanHandle}' not found or API unreachable.`;
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-dark-card border border-dark-border rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 relative">
        {/* Cancel button if changing username */}
        {!isFirstTime && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-dark-hover transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center mx-auto mb-3">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight flex items-center justify-center gap-2">
            Welcome to Codeforces Plus <Sparkles className="w-5 h-5 text-amber-400" />
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {isFirstTime
              ? 'Enter your Codeforces username to personalize your rating history, submissions, performance, and bookmarks.'
              : 'Enter a new Codeforces username to switch your active profile context.'}
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-3.5 bg-rose-950/50 border border-rose-800/60 rounded-xl text-rose-300 text-xs flex items-start gap-2.5 font-sans">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">{error}</div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 font-mono mb-2 uppercase tracking-wider">
              Codeforces Username / Handle
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-slate-500 text-sm">@</span>
              <input
                type="text"
                value={inputHandle}
                onChange={(e) => setInputHandle(e.target.value)}
                placeholder="e.g. tourist"
                className="w-full bg-dark-bg border border-dark-border rounded-xl pl-8 pr-4 py-3 text-sm font-mono text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 transition-all"
                autoFocus
                disabled={loading}
              />
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            {!isFirstTime && onClose && (
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="w-1/3 py-2.5 rounded-xl border border-dark-border text-slate-400 hover:text-white hover:bg-dark-hover font-semibold text-xs transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading || !inputHandle.trim()}
              className={`flex-1 py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Validating Handle...</span>
                </>
              ) : (
                <span>Continue to Codeforces Plus</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
