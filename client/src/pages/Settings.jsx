import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, User, Moon, Sun, CheckCircle2 } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { settingsApi } from '../services/api';
import { ErrorAlert } from '../components/common/ErrorAlert';

export const Settings = () => {
  const { handle, changeHandle, theme, setTheme } = useUser();

  const [inputHandle, setInputHandle] = useState(handle);
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch settings from MongoDB
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await settingsApi.getSettings(handle);
        if (res.data?.success && res.data.data) {
          const s = res.data.data;
          if (s.theme) setSelectedTheme(s.theme);
          if (s.itemsPerPage) setItemsPerPage(s.itemsPerPage);
        }
      } catch (err) {
        console.error('Settings load error:', err);
      }
    };
    if (handle) {
      fetchSettings();
    }
  }, [handle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const cleanHandle = inputHandle.trim();
      if (!cleanHandle) {
        setErrorMsg('Codeforces handle cannot be empty');
        setLoading(false);
        return;
      }

      const res = await settingsApi.updateSettings(handle, {
        newHandle: cleanHandle,
        theme: selectedTheme,
        itemsPerPage
      });

      if (res.data?.success) {
        changeHandle(cleanHandle);
        setTheme(selectedTheme);
        setSuccessMsg('Settings saved successfully in MongoDB!');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Title */}
      <div className="pb-4 border-b border-dark-border">
        <h1 className="text-2xl font-bold font-heading text-white tracking-tight flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-sky-400" /> Platform Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Configure default Codeforces account handle, visual theme, and database preferences
        </p>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-emerald-300 text-sm flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" /> {successMsg}
        </div>
      )}

      {errorMsg && <ErrorAlert message={errorMsg} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Codeforces Handle Settings */}
        <div className="p-6 bg-dark-card border border-dark-border rounded-xl space-y-4">
          <h3 className="font-heading font-semibold text-white text-base flex items-center gap-2">
            <User className="w-4 h-4 text-sky-400" /> Codeforces Handle Configuration
          </h3>

          <div>
            <label className="block text-xs text-slate-400 font-mono mb-2 uppercase">
              Active User Handle
            </label>
            <input
              type="text"
              value={inputHandle}
              onChange={(e) => setInputHandle(e.target.value)}
              className="w-full max-w-md bg-dark-bg border border-dark-border rounded-lg px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-sky-500/50"
              placeholder="e.g. pavankumar2614"
              required
            />
            <p className="text-xs text-slate-500 mt-1.5">
              This handle is used across all API requests to pull real profile stats, contest performance, and submission history.
            </p>
          </div>
        </div>

        {/* Theme Preferences */}
        <div className="p-6 bg-dark-card border border-dark-border rounded-xl space-y-4">
          <h3 className="font-heading font-semibold text-white text-base flex items-center gap-2">
            <Moon className="w-4 h-4 text-purple-400" /> Visual Theme Preference
          </h3>

          <div className="grid grid-cols-2 gap-4 max-w-md">
            <button
              type="button"
              onClick={() => setSelectedTheme('dark')}
              className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${
                selectedTheme === 'dark'
                  ? 'bg-sky-500/10 border-sky-500 text-sky-300 font-semibold'
                  : 'bg-dark-bg border-dark-border text-slate-400 hover:text-slate-200'
              }`}
            >
              <Moon className="w-5 h-5 text-sky-400" />
              <div>
                <span className="text-sm font-medium block">Dark Mode</span>
                <span className="text-[11px] text-slate-400">Default high contrast</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTheme('light')}
              className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${
                selectedTheme === 'light'
                  ? 'bg-sky-500/10 border-sky-500 text-sky-300 font-semibold'
                  : 'bg-dark-bg border-dark-border text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-sm font-medium block">Light Mode</span>
                <span className="text-[11px] text-slate-400">Clean light surface</span>
              </div>
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};
