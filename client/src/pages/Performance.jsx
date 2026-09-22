import React, { useState, useEffect } from 'react';
import { TrendingUp, PieChart, BarChart2, Layers, Cpu, Award } from 'lucide-react';
import { performanceApi } from '../services/api';
import { useUser } from '../context/UserContext';
import { getRankColor, getRankBadgeClass } from '../utils/formatters';
import { TableSkeleton } from '../components/common/Skeleton';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { EmptyState } from '../components/common/EmptyState';

export const Performance = () => {
  const { handle } = useUser();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPerformance = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await performanceApi.getStats(handle);
      if (res.data?.success) {
        setData(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || `Failed to calculate performance analytics for @${handle}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (handle) {
      fetchPerformance();
    }
  }, [handle]);

  const stats = data?.stats;
  const ratingHistory = data?.ratingHistory || [];

  // Difficulty breakdown sorting
  const difficultyEntries = Object.entries(stats?.difficultyDistribution || {})
    .map(([rating, count]) => ({ rating: parseInt(rating), count }))
    .sort((a, b) => a.rating - b.rating);

  const maxDiffCount = Math.max(...difficultyEntries.map(d => d.count), 1);

  // Tag breakdown sorting (top 12)
  const tagEntries = Object.entries(stats?.tagDistribution || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);

  const maxTagCount = Math.max(...tagEntries.map(t => t[1]), 1);

  // Verdict breakdown
  const verdictEntries = Object.entries(stats?.verdictDistribution || {})
    .sort((a, b) => b[1] - a[1]);

  // Language breakdown
  const langEntries = Object.entries(stats?.languageDistribution || {})
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-dark-border">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white tracking-tight flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-purple-400" /> Performance Analytics
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Descriptive statistics and topic breakdown for <span className="font-mono text-sky-400">@{handle}</span>
          </p>
        </div>
      </div>

      {error && <ErrorAlert message={error} onRetry={fetchPerformance} />}

      {loading ? (
        <TableSkeleton rows={6} cols={3} />
      ) : !stats || stats.totalSubmissions === 0 ? (
        <EmptyState
          icon={TrendingUp}
          title="Insufficient Performance Data"
          description={`No recorded submissions found on Codeforces for handle @${handle}.`}
        />
      ) : (
        <div className="space-y-6">
          {/* Top Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-dark-card border border-dark-border rounded-xl">
              <span className="text-xs text-slate-400 font-mono uppercase block mb-1">Solved Problems</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold font-mono text-emerald-400">{stats.solvedCount}</span>
                <span className="text-xs text-slate-400 font-mono">Unique Problems</span>
              </div>
            </div>

            <div className="p-5 bg-dark-card border border-dark-border rounded-xl">
              <span className="text-xs text-slate-400 font-mono uppercase block mb-1">Attempted Problems</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold font-mono text-sky-400">{stats.attemptedCount}</span>
                <span className="text-xs text-slate-400 font-mono">Attempted</span>
              </div>
            </div>

            <div className="p-5 bg-dark-card border border-dark-border rounded-xl">
              <span className="text-xs text-slate-400 font-mono uppercase block mb-1">Total Submissions</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold font-mono text-slate-100">{stats.totalSubmissions}</span>
                <span className="text-xs text-slate-400 font-mono">Submissions</span>
              </div>
            </div>

            <div className="p-5 bg-dark-card border border-dark-border rounded-xl">
              <span className="text-xs text-slate-400 font-mono uppercase block mb-1">Acceptance Rate</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold font-mono text-purple-400">{stats.acceptanceRate}%</span>
                <span className="text-xs text-slate-400 font-mono">AC / Total</span>
              </div>
            </div>
          </div>

          {/* Difficulty Distribution Section */}
          <div className="p-6 bg-dark-card border border-dark-border rounded-xl">
            <div className="flex items-center gap-2 mb-6">
              <BarChart2 className="w-5 h-5 text-sky-400" />
              <h3 className="font-heading font-semibold text-white text-base">
                Problem Difficulty Distribution (Solved)
              </h3>
            </div>

            {difficultyEntries.length === 0 ? (
              <p className="text-xs text-slate-400">No rated solved problems available.</p>
            ) : (
              <div className="space-y-3">
                {difficultyEntries.map(({ rating, count }) => {
                  const pct = Math.round((count / maxDiffCount) * 100);
                  return (
                    <div key={rating} className="flex items-center gap-4 text-xs font-mono">
                      <span className={`w-14 shrink-0 ${getRankColor(rating)}`}>{rating}</span>
                      <div className="flex-1 bg-dark-bg h-5 rounded-full overflow-hidden p-0.5 border border-dark-border">
                        <div
                          className="bg-sky-500/80 h-full rounded-full transition-all duration-500 flex items-center justify-end px-2 text-[10px] font-bold text-slate-950"
                          style={{ width: `${Math.max(pct, 6)}%` }}
                        >
                          {count}
                        </div>
                      </div>
                      <span className="w-10 text-right text-slate-400 shrink-0">{count}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Tag Breakdown & Verdict Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Problem Tags */}
            <div className="p-6 bg-dark-card border border-dark-border rounded-xl">
              <div className="flex items-center gap-2 mb-6">
                <Layers className="w-5 h-5 text-emerald-400" />
                <h3 className="font-heading font-semibold text-white text-base">
                  Top Topic Tags Solved
                </h3>
              </div>

              {tagEntries.length === 0 ? (
                <p className="text-xs text-slate-400">No tag data available.</p>
              ) : (
                <div className="space-y-3">
                  {tagEntries.map(([tag, count]) => {
                    const pct = Math.round((count / maxTagCount) * 100);
                    return (
                      <div key={tag} className="flex items-center gap-4 text-xs font-mono">
                        <span className="w-36 truncate text-slate-300 capitalize">{tag}</span>
                        <div className="flex-1 bg-dark-bg h-4 rounded-full overflow-hidden p-0.5 border border-dark-border">
                          <div
                            className="bg-emerald-500/70 h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(pct, 4)}%` }}
                          />
                        </div>
                        <span className="w-8 text-right text-slate-400 font-semibold">{count}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Verdict Distribution */}
            <div className="p-6 bg-dark-card border border-dark-border rounded-xl">
              <div className="flex items-center gap-2 mb-6">
                <PieChart className="w-5 h-5 text-amber-400" />
                <h3 className="font-heading font-semibold text-white text-base">
                  Verdict Breakdown
                </h3>
              </div>

              {verdictEntries.length === 0 ? (
                <p className="text-xs text-slate-400">No verdict data available.</p>
              ) : (
                <div className="space-y-3">
                  {verdictEntries.map(([verdict, count]) => {
                    const pct = ((count / stats.totalSubmissions) * 100).toFixed(1);
                    return (
                      <div key={verdict} className="flex items-center justify-between p-3 bg-dark-bg/60 border border-dark-border rounded-lg text-xs font-mono">
                        <span className="text-slate-200 font-medium">{verdict}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400">{count} subs</span>
                          <span className="font-bold text-sky-400">{pct}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Language Breakdown */}
          <div className="p-6 bg-dark-card border border-dark-border rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-5 h-5 text-indigo-400" />
              <h3 className="font-heading font-semibold text-white text-base">
                Programming Language Usage
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {langEntries.map(([lang, count]) => (
                <div key={lang} className="p-3 bg-dark-bg/60 border border-dark-border rounded-lg flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-medium truncate">{lang}</span>
                  <span className="text-sky-400 font-bold">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
