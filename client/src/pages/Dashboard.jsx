import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Trophy,
  Code2,
  History,
  TrendingUp,
  User,
  ExternalLink,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { profileApi, contestApi } from '../services/api';
import { getRankColor, getRankBadgeClass, formatDate, formatDuration, getCountdown } from '../utils/formatters';
import { VerdictBadge } from '../components/common/VerdictBadge';
import { CardSkeleton, TableSkeleton } from '../components/common/Skeleton';
import { ErrorAlert } from '../components/common/ErrorAlert';

export const Dashboard = () => {
  const { handle } = useUser();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [recentSubmissions, setRecentSubmissions] = useState([]);

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingContests, setLoadingContests] = useState(true);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);

  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setError(null);
    setLoadingProfile(true);
    setLoadingContests(true);
    setLoadingSubmissions(true);

    // Profile data
    try {
      const res = await profileApi.getProfile(handle);
      if (res.data?.success) {
        setProfileData(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || `Failed to fetch profile for @${handle}`);
    } finally {
      setLoadingProfile(false);
    }

    // Contests data
    try {
      const res = await contestApi.getUpcoming();
      if (res.data?.success) {
        setUpcomingContests((res.data.data || []).slice(0, 4));
      }
    } catch (err) {
      console.error('Contests error:', err);
    } finally {
      setLoadingContests(false);
    }

    // Recent Submissions
    try {
      const res = await profileApi.getSubmissions(handle, 6);
      if (res.data?.success) {
        setRecentSubmissions(res.data.data || []);
      }
    } catch (err) {
      console.error('Submissions error:', err);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    if (handle) {
      fetchDashboardData();
    }
  }, [handle]);

  const userInfo = profileData?.info;
  const stats = profileData?.stats;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-dark-border">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white tracking-tight">
            Developer Command Center
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time Codeforces intelligence for <span className="font-mono text-sky-400">@{handle}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/problems"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-colors"
          >
            <Code2 className="w-4 h-4" /> Browse Problems
          </Link>
          <a
            href={`https://codeforces.com/profile/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-card border border-dark-border hover:border-slate-600 text-slate-300 hover:text-white font-medium text-xs transition-all"
          >
            Codeforces Profile <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {error && <ErrorAlert message={error} onRetry={fetchDashboardData} />}

      {/* Profile Summary Card */}
      {loadingProfile ? (
        <CardSkeleton />
      ) : userInfo ? (
        <div className="p-6 bg-dark-card border border-dark-border rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {userInfo.titlePhoto ? (
              <img
                src={userInfo.titlePhoto}
                alt={userInfo.handle}
                className="w-16 h-16 rounded-xl border border-dark-border object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-slate-800 border border-dark-border flex items-center justify-center text-slate-400">
                <User className="w-8 h-8" />
              </div>
            )}

            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold font-mono text-white">@{userInfo.handle}</h2>
                <span className={`px-2.5 py-0.5 rounded text-xs border uppercase font-mono ${getRankBadgeClass(userInfo.rating)}`}>
                  {userInfo.rank || 'Unrated'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {userInfo.organization || 'Independent Competitive Programmer'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-dark-border pt-4 md:pt-0 md:pl-6">
            <div>
              <span className="text-xs text-slate-400 block uppercase font-mono">Current Rating</span>
              <span className={`text-2xl font-bold font-mono ${getRankColor(userInfo.rating)}`}>
                {userInfo.rating !== undefined && userInfo.rating !== null ? userInfo.rating : 'N/A'}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block uppercase font-mono">Max Rating</span>
              <span className={`text-2xl font-bold font-mono ${getRankColor(userInfo.maxRating)}`}>
                {userInfo.maxRating !== undefined && userInfo.maxRating !== null ? `${userInfo.maxRating} (${userInfo.maxRank || 'N/A'})` : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {/* Quick Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-4 bg-dark-card border border-dark-border rounded-xl">
          <span className="text-xs text-slate-400 font-mono uppercase block mb-1">Current Rating</span>
          <span className={`text-xl font-bold font-mono ${getRankColor(userInfo?.rating)}`}>
            {userInfo?.rating ?? 'N/A'}
          </span>
        </div>

        <div className="p-4 bg-dark-card border border-dark-border rounded-xl">
          <span className="text-xs text-slate-400 font-mono uppercase block mb-1">Max Rating</span>
          <span className={`text-xl font-bold font-mono ${getRankColor(userInfo?.maxRating)}`}>
            {userInfo?.maxRating ?? 'N/A'}
          </span>
        </div>

        <div className="p-4 bg-dark-card border border-dark-border rounded-xl">
          <span className="text-xs text-slate-400 font-mono uppercase block mb-1">Solved</span>
          <span className="text-xl font-bold font-mono text-emerald-400">
            {stats ? stats.solvedCount : 'N/A'}
          </span>
        </div>

        <div className="p-4 bg-dark-card border border-dark-border rounded-xl">
          <span className="text-xs text-slate-400 font-mono uppercase block mb-1">Attempted</span>
          <span className="text-xl font-bold font-mono text-sky-400">
            {stats ? stats.attemptedCount : 'N/A'}
          </span>
        </div>

        <div className="p-4 bg-dark-card border border-dark-border rounded-xl">
          <span className="text-xs text-slate-400 font-mono uppercase block mb-1">Submissions</span>
          <span className="text-xl font-bold font-mono text-slate-200">
            {stats ? stats.totalSubmissions : 'N/A'}
          </span>
        </div>

        <div className="p-4 bg-dark-card border border-dark-border rounded-xl">
          <span className="text-xs text-slate-400 font-mono uppercase block mb-1">Acceptance Rate</span>
          <span className="text-xl font-bold font-mono text-purple-400">
            {stats ? `${stats.acceptanceRate}%` : 'N/A'}
          </span>
        </div>
      </div>

      {/* Middle Section: Upcoming Contests & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Contests Widget */}
        <div className="lg:col-span-2 bg-dark-card border border-dark-border rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h3 className="font-heading font-semibold text-white">Upcoming Codeforces Contests</h3>
              </div>
              <Link to="/contests" className="text-xs text-sky-400 hover:underline font-mono flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {loadingContests ? (
              <TableSkeleton rows={3} cols={3} />
            ) : upcomingContests.length === 0 ? (
              <p className="text-sm text-slate-400 py-6 text-center">No upcoming contests scheduled right now.</p>
            ) : (
              <div className="space-y-3">
                {upcomingContests.map((c) => (
                  <div
                    key={c.id}
                    className="p-3.5 bg-dark-bg/60 border border-dark-border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200 hover:text-sky-300">
                        {c.name}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 font-mono">
                        <span>{formatDate(c.startTimeSeconds)}</span>
                        <span>•</span>
                        <span>Duration: {formatDuration(c.durationSeconds)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-mono font-semibold px-2 py-1 bg-amber-950/40 text-amber-400 border border-amber-800/40 rounded">
                        {getCountdown(c.startTimeSeconds)}
                      </span>
                      <a
                        href={`https://codeforces.com/contests/${c.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors flex items-center gap-1"
                      >
                        Codeforces <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Quick Navigation</h3>
            <div className="space-y-2.5">
              <button
                onClick={() => navigate('/problems')}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-dark-bg/80 border border-dark-border hover:border-sky-500/40 hover:bg-dark-hover transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <Code2 className="w-4 h-4 text-sky-400" />
                  <span className="text-sm text-slate-200 font-medium">Browse Problems</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => navigate('/contests')}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-dark-bg/80 border border-dark-border hover:border-sky-500/40 hover:bg-dark-hover transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-slate-200 font-medium">Upcoming Contests</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => navigate('/submissions')}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-dark-bg/80 border border-dark-border hover:border-sky-500/40 hover:bg-dark-hover transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <History className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-slate-200 font-medium">My Submissions</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => navigate('/performance')}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-dark-bg/80 border border-dark-border hover:border-sky-500/40 hover:bg-dark-hover transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-slate-200 font-medium">Performance Stats</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Submissions Section */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-sky-400" />
            <h3 className="font-heading font-semibold text-white">Recent Submissions</h3>
          </div>
          <Link to="/submissions" className="text-xs text-sky-400 hover:underline font-mono flex items-center gap-1">
            All Submissions <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {loadingSubmissions ? (
          <TableSkeleton rows={4} cols={5} />
        ) : recentSubmissions.length === 0 ? (
          <p className="text-sm text-slate-400 py-6 text-center">No recent submissions found for @{handle}.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-dark-border text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 font-medium">Problem</th>
                  <th className="pb-3 font-medium">Verdict</th>
                  <th className="pb-3 font-medium">Rating</th>
                  <th className="pb-3 font-medium">Language</th>
                  <th className="pb-3 font-medium text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/50">
                {recentSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-dark-hover/40 transition-colors">
                    <td className="py-3 font-sans font-medium text-slate-200">
                      <a
                        href={`https://codeforces.com/problemset/problem/${sub.problem.contestId}/${sub.problem.index}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-sky-300 inline-flex items-center gap-1"
                      >
                        <span className="font-mono text-slate-400">{sub.problem.contestId}{sub.problem.index}.</span>
                        <span>{sub.problem.name}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                      </a>
                    </td>
                    <td className="py-3">
                      <VerdictBadge verdict={sub.verdict} />
                    </td>
                    <td className="py-3 font-mono">
                      {sub.problem.rating ? (
                        <span className={getRankColor(sub.problem.rating)}>{sub.problem.rating}</span>
                      ) : (
                        <span className="text-slate-400">N/A</span>
                      )}
                    </td>
                    <td className="py-3 text-slate-400">{sub.programmingLanguage}</td>
                    <td className="py-3 text-right text-slate-400">{formatDate(sub.creationTimeSeconds)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
