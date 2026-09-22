export const calculateUserStats = (submissions = []) => {
  if (!Array.isArray(submissions) || submissions.length === 0) {
    return {
      totalSubmissions: 0,
      solvedCount: 0,
      attemptedCount: 0,
      acceptanceRate: 0,
      verdictDistribution: {},
      languageDistribution: {},
      difficultyDistribution: {},
      tagDistribution: {}
    };
  }

  const totalSubmissions = submissions.length;
  const solvedProblemKeys = new Set();
  const attemptedProblemKeys = new Set();

  const verdictDistribution = {};
  const languageDistribution = {};
  const difficultyDistribution = {};
  const tagDistribution = {};

  submissions.forEach((sub) => {
    // Verdict count
    const verdict = sub.verdict || 'UNKNOWN';
    verdictDistribution[verdict] = (verdictDistribution[verdict] || 0) + 1;

    // Language count
    const lang = sub.programmingLanguage || 'Other';
    languageDistribution[lang] = (languageDistribution[lang] || 0) + 1;

    // Problem identification
    const problem = sub.problem;
    if (problem) {
      const probKey = `${problem.contestId}-${problem.index}`;
      attemptedProblemKeys.add(probKey);

      if (verdict === 'OK') {
        if (!solvedProblemKeys.has(probKey)) {
          solvedProblemKeys.add(probKey);

          // Rating distribution (only for unique solved problems)
          if (problem.rating) {
            const bucket = `${Math.floor(problem.rating / 100) * 100}`;
            difficultyDistribution[bucket] = (difficultyDistribution[bucket] || 0) + 1;
          }

          // Tag distribution (only for unique solved problems)
          if (Array.isArray(problem.tags)) {
            problem.tags.forEach((tag) => {
              tagDistribution[tag] = (tagDistribution[tag] || 0) + 1;
            });
          }
        }
      }
    }
  });

  const solvedCount = solvedProblemKeys.size;
  const attemptedCount = attemptedProblemKeys.size;
  const acceptanceRate = totalSubmissions > 0
    ? Number(((submissions.filter(s => s.verdict === 'OK').length / totalSubmissions) * 100).toFixed(1))
    : 0;

  return {
    totalSubmissions,
    solvedCount,
    attemptedCount,
    acceptanceRate,
    verdictDistribution,
    languageDistribution,
    difficultyDistribution,
    tagDistribution,
    solvedProblemKeys: Array.from(solvedProblemKeys),
    attemptedProblemKeys: Array.from(attemptedProblemKeys)
  };
};
