import React, { useState } from 'react';
import { Bookmark, Search, Trash2, ExternalLink, Code2 } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { getRankColor } from '../utils/formatters';
import { TableSkeleton } from '../components/common/Skeleton';
import { EmptyState } from '../components/common/EmptyState';
import { getProgramizCompilerUrl } from '../utils/programiz';

export const Saved = () => {
  const { handle, savedProblemsList, loadingSaved, toggleSaveProblem, compilerLanguage } = useUser();
  const [search, setSearch] = useState('');

  const filteredSaved = savedProblemsList.filter((item) => {
    const q = search.toLowerCase();
    return (
      !search ||
      item.name.toLowerCase().includes(q) ||
      String(item.contestId).includes(q) ||
      item.problemId.toLowerCase().includes(q)
    );
  });

  const programizUrl = getProgramizCompilerUrl(compilerLanguage);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-dark-border">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white tracking-tight flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-sky-400 fill-sky-400/20" /> Saved Bookmarks
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Persisted problem bookmarks stored in MongoDB for <span className="font-mono text-sky-400">@{handle || 'User'}</span>
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-dark-card px-3 py-1.5 rounded-lg border border-dark-border self-start sm:self-auto">
          Saved Count: <span className="font-bold text-sky-400">{savedProblemsList.length}</span>
        </div>
      </div>

      {/* Search Toolbar */}
      {savedProblemsList.length > 0 && (
        <div className="p-4 bg-dark-card border border-dark-border rounded-xl">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search saved problems by title or ID..."
              className="w-full bg-dark-bg border border-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500/50"
            />
          </div>
        </div>
      )}

      {/* Saved Problems Table */}
      {loadingSaved ? (
        <TableSkeleton rows={5} cols={5} />
      ) : savedProblemsList.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No Saved Problems"
          description="Click the bookmark icon on any problem in the Problem Explorer to save it here."
        />
      ) : filteredSaved.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No Matching Saved Problems"
          description="Try broadening your search query."
        />
      ) : (
        <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-dark-border bg-dark-bg/50 text-slate-400 uppercase tracking-wider">
                  <th className="p-4 font-medium">Problem</th>
                  <th className="p-4 font-medium">Rating</th>
                  <th className="p-4 font-medium">Tags</th>
                  <th className="p-4 font-medium">Saved At</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/50">
                {filteredSaved.map((item) => (
                  <tr key={item.problemId} className="hover:bg-dark-hover/40 transition-colors">
                    <td className="p-4 font-sans font-medium text-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-400 text-xs">{item.problemId}.</span>
                        <span className="text-sm font-semibold">{item.name}</span>
                      </div>
                    </td>

                    <td className="p-4 font-mono font-semibold">
                      {item.rating ? (
                        <span className={getRankColor(item.rating)}>{item.rating}</span>
                      ) : (
                        <span className="text-slate-400">Unrated</span>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {(item.tags || []).slice(0, 3).map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="p-4 text-slate-400">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recently'}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 font-sans text-xs transition-colors"
                        >
                          Codeforces <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <a
                          href={programizUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 font-sans text-xs transition-colors font-medium"
                          title="Test code on official Programiz online compiler"
                        >
                          Test on Programiz <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => toggleSaveProblem(item)}
                          className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 border border-rose-800/40 hover:bg-rose-900/60 transition-colors"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
