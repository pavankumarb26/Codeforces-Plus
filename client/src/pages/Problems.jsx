import React, { useState, useEffect } from 'react';
import {
  Code2,
  Search,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  BookOpen,
  Send,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';
import { problemApi } from '../services/api';
import { useUser } from '../context/UserContext';
import { getRankColor } from '../utils/formatters';
import { TableSkeleton } from '../components/common/Skeleton';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { EmptyState } from '../components/common/EmptyState';

export const Problems = () => {
  const { handle, isProblemSaved, toggleSaveProblem } = useUser();

  const [problems, setProblems] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination & Filters
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [search, setSearch] = useState('');
  const [minRating, setMinRating] = useState('');
  const [maxRating, setMaxRating] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // 'solved', 'attempted', 'unsolved'
  const [divisionFilter, setDivisionFilter] = useState('all'); // 'all', 'div1', 'div2', 'div3', 'div4', 'educational', 'global'
  const [sortBy, setSortBy] = useState('rating');
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchProblems = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        handle,
        page,
        limit: 25,
        search,
        minRating,
        maxRating,
        tags: selectedTag,
        status: statusFilter,
        division: divisionFilter,
        sortBy,
        sortOrder
      };

      const res = await problemApi.getProblems(params);
      if (res.data?.success) {
        setProblems(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
        setTotalCount(res.data.totalCount || 0);
        if (Array.isArray(res.data.availableTags)) {
          setAvailableTags(res.data.availableTags);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch problemset from Codeforces');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, [handle, page, selectedTag, statusFilter, divisionFilter, sortBy, sortOrder]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProblems();
  };

  const resetFilters = () => {
    setSearch('');
    setMinRating('');
    setMaxRating('');
    setSelectedTag('');
    setStatusFilter('');
    setDivisionFilter('all');
    setSortBy('rating');
    setSortOrder('asc');
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-dark-border">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white tracking-tight flex items-center gap-2">
            <Code2 className="w-6 h-6 text-sky-400" /> Problem Explorer
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Filter, search, and bookmark authentic Codeforces problem set algorithms
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-dark-card px-3 py-1.5 rounded-lg border border-dark-border self-start sm:self-auto">
          Total Found: <span className="font-bold text-sky-400">{totalCount}</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <form onSubmit={handleSearchSubmit} className="p-4 bg-dark-card border border-dark-border rounded-xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search problem title or ID..."
              className="w-full bg-dark-bg border border-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500/50"
            />
          </div>

          {/* Division Filter */}
          <select
            value={divisionFilter}
            onChange={(e) => { setDivisionFilter(e.target.value); setPage(1); }}
            className="bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-500/50 font-mono font-semibold"
          >
            <option value="all">All Divisions</option>
            <option value="div1">Div. 1</option>
            <option value="div2">Div. 2</option>
            <option value="div3">Div. 3</option>
            <option value="div4">Div. 4</option>
            <option value="educational">Educational</option>
            <option value="global">Global</option>
          </select>

          {/* Tag Filter */}
          <select
            value={selectedTag}
            onChange={(e) => { setSelectedTag(e.target.value); setPage(1); }}
            className="bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-500/50 font-mono"
          >
            <option value="">All Problem Tags</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>

          {/* User Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-500/50 font-mono"
          >
            <option value="">All User Status</option>
            <option value="solved">Solved by @{handle}</option>
            <option value="attempted">Attempted (Unsolved)</option>
            <option value="unsolved">Unattempted</option>
          </select>

          {/* Sorting */}
          <select
            value={`${sortBy}_${sortOrder}`}
            onChange={(e) => {
              const [sb, so] = e.target.value.split('_');
              setSortBy(sb);
              setSortOrder(so);
              setPage(1);
            }}
            className="bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-500/50 font-mono"
          >
            <option value="rating_asc">Rating: Low to High</option>
            <option value="rating_desc">Rating: High to Low</option>
            <option value="name_asc">Name: A to Z</option>
            <option value="contest_desc">Contest ID: Newest</option>
          </select>
        </div>

        {/* Rating Min/Max Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-dark-border/50">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Rating Range:</span>
            <input
              type="number"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              placeholder="Min (e.g. 800)"
              className="w-28 bg-dark-bg border border-dark-border rounded px-2.5 py-1 text-xs font-mono text-slate-200 focus:outline-none focus:border-sky-500/50"
            />
            <span className="text-slate-500">-</span>
            <input
              type="number"
              value={maxRating}
              onChange={(e) => setMaxRating(e.target.value)}
              placeholder="Max (e.g. 2000)"
              className="w-28 bg-dark-bg border border-dark-border rounded px-2.5 py-1 text-xs font-mono text-slate-200 focus:outline-none focus:border-sky-500/50"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs rounded transition-colors"
            >
              Apply Filter
            </button>
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="text-xs text-slate-400 hover:text-white underline font-mono"
          >
            Reset Filters
          </button>
        </div>
      </form>

      {error && <ErrorAlert message={error} onRetry={fetchProblems} />}

      {/* Problem Table */}
      {loading ? (
        <TableSkeleton rows={10} cols={7} />
      ) : problems.length === 0 ? (
        <EmptyState
          icon={Code2}
          title="No Codeforces Problems Found"
          description="Try broadening your rating range, division selection, or tag filters."
        />
      ) : (
        <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-dark-border bg-dark-bg/50 text-slate-400 uppercase tracking-wider">
                  <th className="p-4 font-medium w-10">Save</th>
                  <th className="p-4 font-medium">Problem</th>
                  <th className="p-4 font-medium">Division</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Rating</th>
                  <th className="p-4 font-medium">Tags</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/50">
                {problems.map((prob) => {
                  const probId = `${prob.contestId}-${prob.index}`;
                  const isSaved = isProblemSaved(probId);

                  // Construct dynamic Codeforces Submit URL preselecting problem code (e.g. 2011C or 1900A)
                  const problemCode = prob.contestId && prob.index ? `${prob.contestId}${prob.index}` : null;
                  const submitUrl = problemCode
                    ? `https://codeforces.com/problemset/submit?submittedProblemCode=${encodeURIComponent(problemCode)}`
                    : 'https://codeforces.com/problemset/submit';

                  return (
                    <tr key={probId} className="hover:bg-dark-hover/40 transition-colors">
                      <td className="p-4">
                        <button
                          onClick={() => toggleSaveProblem(prob)}
                          className="p-1 rounded text-slate-400 hover:text-sky-400 transition-colors"
                          title={isSaved ? 'Remove Bookmark' : 'Save Problem'}
                        >
                          {isSaved ? (
                            <BookmarkCheck className="w-4 h-4 text-sky-400 fill-sky-400/20" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      <td className="p-4 font-sans font-medium text-slate-200">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-slate-400 text-xs">
                            {prob.contestId}{prob.index}
                          </span>
                          <span className="text-sm font-semibold">{prob.name}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60 text-slate-300 font-mono text-[11px]">
                          {prob.division || 'Other'}
                        </span>
                      </td>

                      <td className="p-4">
                        {prob.userStatus === 'SOLVED' && (
                          <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40 text-[11px]">
                            <CheckCircle2 className="w-3 h-3" /> Solved
                          </span>
                        )}
                        {prob.userStatus === 'ATTEMPTED' && (
                          <span className="inline-flex items-center gap-1 text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40 text-[11px]">
                            <AlertCircle className="w-3 h-3" /> Attempted
                          </span>
                        )}
                        {prob.userStatus === 'UNATTEMPTED' && (
                          <span className="text-slate-500 text-[11px]">-</span>
                        )}
                      </td>

                      <td className="p-4 font-mono font-semibold">
                        {prob.rating ? (
                          <span className={getRankColor(prob.rating)}>{prob.rating}</span>
                        ) : (
                          <span className="text-slate-400">Unrated</span>
                        )}
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {(prob.tags || []).slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              onClick={() => { setSelectedTag(tag); setPage(1); }}
                              className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[10px] font-mono cursor-pointer transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                          {(prob.tags || []).length > 3 && (
                            <span className="text-[10px] text-slate-400 self-center">
                              +{prob.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={prob.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 font-sans text-xs transition-colors"
                          >
                            Problem <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href={submitUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-sans text-xs transition-colors font-medium"
                            title={`Submit solution for ${prob.contestId}${prob.index} on Codeforces`}
                          >
                            Submit Solution <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          {prob.editorialUrl && (
                            <a
                              href={prob.editorialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-sans text-xs transition-colors"
                              title="Official Codeforces Editorial"
                            >
                              Editorial <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 bg-dark-bg/60 border-t border-dark-border flex items-center justify-between font-mono text-xs text-slate-400">
            <span>
              Page <strong className="text-white">{page}</strong> of <strong className="text-white">{totalPages}</strong>
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded bg-dark-card border border-dark-border disabled:opacity-40 hover:text-white transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded bg-dark-card border border-dark-border disabled:opacity-40 hover:text-white transition-colors flex items-center gap-1"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
