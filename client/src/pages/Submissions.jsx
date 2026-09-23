import React, { useState, useEffect } from 'react';
import { History, Search, ExternalLink, Filter } from 'lucide-react';
import { profileApi } from '../services/api';
import { useUser } from '../context/UserContext';
import { formatDate, getRankColor } from '../utils/formatters';
import { VerdictBadge } from '../components/common/VerdictBadge';
import { TableSkeleton } from '../components/common/Skeleton';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { EmptyState } from '../components/common/EmptyState';

export const Submissions = () => {
  const { handle } = useUser();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState('');
  const [verdictFilter, setVerdictFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');

  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await profileApi.getSubmissions(handle, 200);
      if (res.data?.success) {
        setSubmissions(res.data.data || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || `Failed to fetch submissions for @${handle}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (handle) {
      fetchSubmissions();
    }
  }, [handle]);

  // Extract available languages for filter
  const languagesSet = new Set();
  submissions.forEach(s => {
    if (s.programmingLanguage) languagesSet.add(s.programmingLanguage);
  });
  const languagesList = Array.from(languagesSet).sort();

  // Filter logic
  const filteredSubmissions = submissions.filter((sub) => {
    const probName = sub.problem?.name?.toLowerCase() || '';
    const contestId = String(sub.problem?.contestId || '');
    const searchMatch = !search || probName.includes(search.toLowerCase()) || contestId.includes(search);

    let verdictMatch = true;
    if (verdictFilter !== 'all') {
      verdictMatch = sub.verdict === verdictFilter;
    }

    let langMatch = true;
    if (languageFilter !== 'all') {
      langMatch = sub.programmingLanguage === languageFilter;
    }

    return searchMatch && verdictMatch && langMatch;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-dark-border">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white tracking-tight flex items-center gap-2">
            <History className="w-6 h-6 text-emerald-400" /> Submission History
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time Codeforces user submissions for <span className="font-mono text-sky-400">@{handle}</span>
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-dark-card px-3 py-1.5 rounded-lg border border-dark-border self-start sm:self-auto">
          Showing: <span className="font-bold text-emerald-400">{filteredSubmissions.length}</span> / {submissions.length}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 bg-dark-card border border-dark-border rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search problem or contest ID..."
            className="w-full bg-dark-bg border border-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500/50"
          />
        </div>

        {/* Verdict Filter */}
        <select
          value={verdictFilter}
          onChange={(e) => setVerdictFilter(e.target.value)}
          className="bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-500/50 font-mono"
        >
          <option value="all">All Verdicts</option>
          <option value="OK">Accepted (OK)</option>
          <option value="WRONG_ANSWER">Wrong Answer</option>
          <option value="TIME_LIMIT_EXCEEDED">Time Limit Exceeded</option>
          <option value="MEMORY_LIMIT_EXCEEDED">Memory Limit Exceeded</option>
          <option value="RUNTIME_ERROR">Runtime Error</option>
          <option value="COMPILATION_ERROR">Compilation Error</option>
        </select>

        {/* Language Filter */}
        <select
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
          className="bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-500/50 font-mono"
        >
          <option value="all">All Languages</option>
          {languagesList.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      {error && <ErrorAlert message={error} onRetry={fetchSubmissions} />}

      {/* Submissions Table */}
      {loading ? (
        <TableSkeleton rows={10} cols={6} />
      ) : filteredSubmissions.length === 0 ? (
        <EmptyState
          icon={History}
          title="No Submissions Found"
          description={`No Codeforces submissions matching filters found for @${handle}.`}
        />
      ) : (
        <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-dark-border bg-dark-bg/50 text-slate-400 uppercase tracking-wider">
                  <th className="p-4 font-medium">Submission ID</th>
                  <th className="p-4 font-medium">Problem</th>
                  <th className="p-4 font-medium">Verdict</th>
                  <th className="p-4 font-medium">Rating</th>
                  <th className="p-4 font-medium">Language</th>
                  <th className="p-4 font-medium">Time / Memory</th>
                  <th className="p-4 font-medium text-right">Submitted At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/50">
                {filteredSubmissions.map((sub) => {
                  const submissionId = sub.id || sub.submissionId;
                  const contestId = sub.contestId || sub.problem?.contestId;
                  const submissionUrl = contestId && submissionId
                    ? `https://codeforces.com/contest/${contestId}/submission/${submissionId}`
                    : null;

                  return (
                    <tr key={sub.id} className="hover:bg-dark-hover/40 transition-colors">
                      <td className="p-4 text-slate-400 font-mono">
                        {submissionUrl ? (
                          <a
                            href={submissionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-400 hover:text-sky-300 hover:underline inline-flex items-center gap-1 transition-colors"
                          >
                            <span>#{submissionId}</span>
                            <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                          </a>
                        ) : (
                          <span>#{submissionId || '-'}</span>
                        )}
                      </td>

                    <td className="p-4 font-sans font-medium text-slate-200">
                      <a
                        href={`https://codeforces.com/problemset/problem/${sub.problem.contestId}/${sub.problem.index}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-sky-300 inline-flex items-center gap-1.5"
                      >
                        <span className="font-mono text-slate-400">{sub.problem.contestId}{sub.problem.index}.</span>
                        <span>{sub.problem.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </a>
                    </td>

                    <td className="p-4">
                      <VerdictBadge verdict={sub.verdict} />
                    </td>

                    <td className="p-4 font-mono font-semibold">
                      {sub.problem.rating ? (
                        <span className={getRankColor(sub.problem.rating)}>{sub.problem.rating}</span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>

                    <td className="p-4 text-slate-300">{sub.programmingLanguage}</td>

                    <td className="p-4 text-slate-400 font-mono text-[11px]">
                      {sub.timeConsumedMillis} ms / {(sub.memoryConsumedBytes / (1024 * 1024)).toFixed(1)} MB
                    </td>

                    <td className="p-4 text-right text-slate-400">{formatDate(sub.creationTimeSeconds)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
