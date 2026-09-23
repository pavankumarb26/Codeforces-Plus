import React, { useState, useEffect } from 'react';
import { User, Award, ExternalLink, ShieldCheck, MapPin, Building, Calendar } from 'lucide-react';
import { profileApi } from '../services/api';
import { useUser } from '../context/UserContext';
import { getRankColor, getRankBadgeClass, formatDate } from '../utils/formatters';
import { CardSkeleton } from '../components/common/Skeleton';
import { ErrorAlert } from '../components/common/ErrorAlert';

export const Profile = () => {
  const { handle, openUsernameModal } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    if (!handle) return;
    setLoading(true);
    setError(null);
    try {
      const res = await profileApi.getProfile(handle);
      if (res.data?.success) {
        setProfileData(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || `Codeforces profile for @${handle} not found.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (handle) {
      fetchProfile();
    } else {
      setProfileData(null);
      setLoading(false);
    }
  }, [handle]);

  const userInfo = profileData?.info;
  const ratingHistory = profileData?.ratingHistory || [];
  const stats = profileData?.stats;

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-dark-border">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white tracking-tight flex items-center gap-2">
            <User className="w-6 h-6 text-sky-400" /> User Profile Integration
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Official Codeforces profile metrics for <span className="font-mono text-sky-400">@{handle || 'User'}</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={openUsernameModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-dark-card border border-dark-border hover:border-sky-500/40 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-sky-400" /> Change Username
          </button>

          {handle && (
            <a
              href={`https://codeforces.com/profile/${handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-300 hover:bg-sky-500/20 text-xs font-semibold transition-all"
            >
              View on Codeforces <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {error && <ErrorAlert message={error} onRetry={fetchProfile} />}

      {loading ? (
        <CardSkeleton />
      ) : userInfo ? (
        <div className="space-y-6">
          {/* Main Profile Header Card */}
          <div className="p-6 bg-dark-card border border-dark-border rounded-xl space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                {userInfo.titlePhoto ? (
                  <img
                    src={userInfo.titlePhoto}
                    alt={userInfo.handle}
                    className="w-20 h-20 rounded-2xl border-2 border-dark-border object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-slate-800 border-2 border-dark-border flex items-center justify-center text-slate-400">
                    <User className="w-10 h-10" />
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold font-mono text-white">@{userInfo.handle}</h2>
                    <span className={`px-3 py-0.5 rounded text-xs uppercase font-mono font-semibold border ${getRankBadgeClass(userInfo.rating)}`}>
                      {userInfo.rank || 'Unrated'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2 font-mono">
                    {userInfo.city && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" /> {userInfo.city}, {userInfo.country}
                      </span>
                    )}
                    {userInfo.organization && (
                      <span className="flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-slate-500" /> {userInfo.organization}
                      </span>
                    )}
                    {userInfo.registrationTimeSeconds && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" /> Member since {new Date(userInfo.registrationTimeSeconds * 1000).getFullYear()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-dark-border pt-4 md:pt-0 md:pl-6 w-full md:w-auto justify-between md:justify-start">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-mono block">Current Rating</span>
                  <span className={`text-3xl font-bold font-mono ${getRankColor(userInfo.rating)}`}>
                    {userInfo.rating ?? 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-mono block">Max Rating</span>
                  <span className={`text-3xl font-bold font-mono ${getRankColor(userInfo.maxRating)}`}>
                    {userInfo.maxRating ?? 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Rating History List */}
          <div className="p-6 bg-dark-card border border-dark-border rounded-xl">
            <h3 className="font-heading font-semibold text-white text-base mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" /> Rating Contest Participation ({ratingHistory.length} contests)
            </h3>

            {ratingHistory.length === 0 ? (
              <p className="text-xs text-slate-400 font-mono">No official rated contest history found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-dark-border bg-dark-bg/50 text-slate-400 uppercase tracking-wider">
                      <th className="p-3 font-medium">Contest</th>
                      <th className="p-3 font-medium">Rank</th>
                      <th className="p-3 font-medium">Old Rating</th>
                      <th className="p-3 font-medium">New Rating</th>
                      <th className="p-3 font-medium">Change</th>
                      <th className="p-3 font-medium text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-border/50">
                    {[...ratingHistory].reverse().slice(0, 15).map((r) => {
                      const diff = r.newRating - r.oldRating;
                      return (
                        <tr key={r.contestId} className="hover:bg-dark-hover/40 transition-colors">
                          <td className="p-3 font-sans font-medium text-slate-200">
                            <a
                              href={`https://codeforces.com/contest/${r.contestId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-sky-300"
                            >
                              {r.contestName}
                            </a>
                          </td>

                          <td className="p-3 text-slate-300">#{r.rank}</td>

                          <td className="p-3 text-slate-400">{r.oldRating}</td>

                          <td className={`p-3 font-bold ${getRankColor(r.newRating)}`}>{r.newRating}</td>

                          <td className="p-3 font-bold">
                            {diff >= 0 ? (
                              <span className="text-emerald-400">+{diff}</span>
                            ) : (
                              <span className="text-rose-400">{diff}</span>
                            )}
                          </td>

                          <td className="p-3 text-right text-slate-400">{formatDate(r.ratingUpdateTimeSeconds)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
