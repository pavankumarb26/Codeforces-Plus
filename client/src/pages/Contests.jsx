import React, { useState, useEffect } from 'react';
import { Trophy, Search, ExternalLink, Calendar, Clock, Filter } from 'lucide-react';
import { contestApi } from '../services/api';
import { formatDate, formatDuration, getCountdown } from '../utils/formatters';
import { TableSkeleton } from '../components/common/Skeleton';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { EmptyState } from '../components/common/EmptyState';

export const Contests = () => {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past'
  const [upcomingList, setUpcomingList] = useState([]);
  const [pastList, setPastList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all', 'div1', 'div2', 'div3', 'div4', 'educational'

  const fetchContests = async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === 'upcoming') {
        const res = await contestApi.getUpcoming();
        if (res.data?.success) {
          setUpcomingList(res.data.data || []);
        }
      } else {
        const res = await contestApi.getPast(60);
        if (res.data?.success) {
          setPastList(res.data.data || []);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch contests from Codeforces API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, [activeTab]);

  const currentRawList = activeTab === 'upcoming' ? upcomingList : pastList;

  // Filter logic
  const filteredContests = currentRawList.filter((c) => {
    const name = c.name.toLowerCase();
    const matchesSearch = !search || name.includes(search.toLowerCase());

    let matchesType = true;
    if (typeFilter === 'div1') matchesType = name.includes('div. 1') || name.includes('div.1');
    if (typeFilter === 'div2') matchesType = name.includes('div. 2') || name.includes('div.2');
    if (typeFilter === 'div3') matchesType = name.includes('div. 3') || name.includes('div.3');
    if (typeFilter === 'div4') matchesType = name.includes('div. 4') || name.includes('div.4');
    if (typeFilter === 'educational') matchesType = name.includes('educational');

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-dark-border">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white tracking-tight flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" /> Contest Browser
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Explore official Codeforces contests, upcoming schedules, and past archives
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center bg-dark-card border border-dark-border p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
              activeTab === 'upcoming'
                ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Upcoming Contests ({upcomingList.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
              activeTab === 'past'
                ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Past Archives
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 bg-dark-card border border-dark-border rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contests by name..."
            className="w-full bg-dark-bg border border-dark-border rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500/50"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-500/50 font-mono"
          >
            <option value="all">All Contest Types</option>
            <option value="div1">Div. 1</option>
            <option value="div2">Div. 2</option>
            <option value="div3">Div. 3</option>
            <option value="div4">Div. 4</option>
            <option value="educational">Educational</option>
          </select>
        </div>
      </div>

      {error && <ErrorAlert message={error} onRetry={fetchContests} />}

      {/* Contest List */}
      {loading ? (
        <TableSkeleton rows={8} cols={4} />
      ) : filteredContests.length === 0 ? (
        <EmptyState
          icon={Trophy}
          title={activeTab === 'upcoming' ? 'No Upcoming Contests Found' : 'No Past Contests Found'}
          description="Try adjusting your search query or type filter."
        />
      ) : (
        <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-dark-border bg-dark-bg/50 text-slate-400 uppercase tracking-wider">
                  <th className="p-4 font-medium">Contest Name</th>
                  <th className="p-4 font-medium">Start Time</th>
                  <th className="p-4 font-medium">Duration</th>
                  {activeTab === 'upcoming' && <th className="p-4 font-medium">Countdown</th>}
                  <th className="p-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/50">
                {filteredContests.map((c) => (
                  <tr key={c.id} className="hover:bg-dark-hover/40 transition-colors">
                    <td className="p-4 font-sans font-medium text-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-400 text-xs">#{c.id}</span>
                        <span className="text-sm font-semibold">{c.name}</span>
                      </div>
                    </td>

                    <td className="p-4 text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{formatDate(c.startTimeSeconds)}</span>
                      </div>
                    </td>

                    <td className="p-4 text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{formatDuration(c.durationSeconds)}</span>
                      </div>
                    </td>

                    {activeTab === 'upcoming' && (
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded bg-amber-950/40 text-amber-400 border border-amber-800/40 font-semibold">
                          {getCountdown(c.startTimeSeconds)}
                        </span>
                      </td>
                    )}

                    <td className="p-4 text-right">
                      <a
                        href={`https://codeforces.com/contests/${c.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-sans text-xs transition-colors"
                      >
                        Codeforces Contest <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
