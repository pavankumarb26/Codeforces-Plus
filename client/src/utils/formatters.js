// Codeforces rank titles and color maps
export const getRankColor = (rating) => {
  if (rating === null || rating === undefined) return 'text-slate-400';
  if (rating < 1200) return 'text-slate-400 font-semibold'; // Newbie
  if (rating < 1400) return 'text-emerald-400 font-semibold'; // Pupil
  if (rating < 1600) return 'text-cyan-400 font-semibold'; // Specialist
  if (rating < 1900) return 'text-blue-400 font-semibold'; // Expert
  if (rating < 2100) return 'text-purple-400 font-semibold'; // Candidate Master
  if (rating < 2400) return 'text-amber-400 font-semibold'; // Master
  if (rating < 3000) return 'text-rose-400 font-semibold'; // Grandmaster
  return 'text-rose-500 font-bold'; // Legendary Grandmaster
};

export const getRankBadgeClass = (rating) => {
  if (rating === null || rating === undefined) return 'bg-slate-800 text-slate-300 border-slate-700';
  if (rating < 1200) return 'bg-slate-800/80 text-slate-300 border-slate-700';
  if (rating < 1400) return 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50';
  if (rating < 1600) return 'bg-cyan-950/60 text-cyan-300 border-cyan-800/50';
  if (rating < 1900) return 'bg-blue-950/60 text-blue-300 border-blue-800/50';
  if (rating < 2100) return 'bg-purple-950/60 text-purple-300 border-purple-800/50';
  if (rating < 2400) return 'bg-amber-950/60 text-amber-300 border-amber-800/50';
  return 'bg-rose-950/60 text-rose-300 border-rose-800/50';
};

// Format duration in seconds to "Xh Ym"
export const formatDuration = (seconds) => {
  if (!seconds) return 'N/A';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
};

// Format unix timestamp (seconds) to readable string
export const formatDate = (timestampSeconds) => {
  if (!timestampSeconds) return 'N/A';
  const date = new Date(timestampSeconds * 1000);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Calculate countdown string
export const getCountdown = (startTimeSeconds) => {
  const now = Math.floor(Date.now() / 1000);
  const diff = startTimeSeconds - now;
  if (diff <= 0) return 'Started';

  const days = Math.floor(diff / (24 * 3600));
  const hours = Math.floor((diff % (24 * 3600)) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);

  if (days > 0) return `in ${days}d ${hours}h`;
  if (hours > 0) return `in ${hours}h ${minutes}m`;
  return `in ${minutes}m`;
};

// Format verdict text and styles
export const getVerdictDetails = (verdict) => {
  switch (verdict) {
    case 'OK':
      return { label: 'Accepted', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40' };
    case 'WRONG_ANSWER':
      return { label: 'Wrong Answer', color: 'text-rose-400 bg-rose-950/40 border-rose-800/40' };
    case 'TIME_LIMIT_EXCEEDED':
      return { label: 'Time Limit Exceeded', color: 'text-amber-400 bg-amber-950/40 border-amber-800/40' };
    case 'MEMORY_LIMIT_EXCEEDED':
      return { label: 'Memory Limit Exceeded', color: 'text-amber-400 bg-amber-950/40 border-amber-800/40' };
    case 'RUNTIME_ERROR':
      return { label: 'Runtime Error', color: 'text-amber-400 bg-amber-950/40 border-amber-800/40' };
    case 'COMPILATION_ERROR':
      return { label: 'Compilation Error', color: 'text-purple-400 bg-purple-950/40 border-purple-800/40' };
    case 'TESTING':
      return { label: 'Testing', color: 'text-sky-400 bg-sky-950/40 border-sky-800/40' };
    default:
      return { label: verdict || 'Submitted', color: 'text-slate-400 bg-slate-800 border-slate-700' };
  }
};
