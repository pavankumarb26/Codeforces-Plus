import { codeforcesService } from '../services/codeforcesService.js';
import { calculateUserStats } from '../utils/statsCalculator.js';
import { classifyContest, getEditorialUrl } from '../utils/contestClassifier.js';

export const getProblems = async (req, res) => {
  try {
    const {
      tags,
      minRating,
      maxRating,
      search,
      status, // 'solved', 'attempted', 'unsolved'
      division, // 'all', 'div1', 'div2', 'div3', 'div4', 'educational', 'global'
      handle,
      sortBy = 'rating',
      sortOrder = 'asc',
      page = 1,
      limit = 25
    } = req.query;

    const [data, contestsList] = await Promise.all([
      codeforcesService.getProblemSet(tags || ''),
      codeforcesService.getContests(false).catch(() => [])
    ]);

    let problems = data.problems || [];
    const problemStatistics = data.problemStatistics || [];

    // Map contests to division metadata
    const contestMap = new Map();
    (contestsList || []).forEach(c => {
      const classification = classifyContest(c.name);
      contestMap.set(c.id, {
        name: c.name,
        division: classification.division,
        category: classification.category
      });
    });

    // Map statistics to problems
    const statsMap = new Map();
    problemStatistics.forEach(stat => {
      statsMap.set(`${stat.contestId}-${stat.index}`, stat.solvedCount);
    });

    // If handle is provided, fetch user status to mark solved/attempted problems
    let solvedKeys = new Set();
    let attemptedKeys = new Set();

    if (handle) {
      try {
        const userSubs = await codeforcesService.getUserStatus(handle, 1, 1000);
        const userStats = calculateUserStats(userSubs);
        solvedKeys = new Set(userStats.solvedProblemKeys);
        attemptedKeys = new Set(userStats.attemptedProblemKeys);
      } catch (err) {
        // Continue without handle stats if handle error
      }
    }

    // Enhance problem objects with Division & Editorial URL
    let enhanced = problems.map(p => {
      const key = `${p.contestId}-${p.index}`;
      const solvedCount = statsMap.get(key) || 0;
      let userStatus = 'UNATTEMPTED';
      if (solvedKeys.has(key)) {
        userStatus = 'SOLVED';
      } else if (attemptedKeys.has(key)) {
        userStatus = 'ATTEMPTED';
      }

      const contestInfo = contestMap.get(p.contestId);
      const divLabel = contestInfo ? contestInfo.division : 'Other';
      const divCategory = contestInfo ? contestInfo.category : 'other';
      const editorialUrl = getEditorialUrl(p.contestId);

      return {
        ...p,
        id: key,
        solvedCount,
        userStatus,
        division: divLabel,
        divisionCategory: divCategory,
        editorialUrl,
        url: `https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`
      };
    });

    // Filtering
    if (minRating) {
      enhanced = enhanced.filter(p => p.rating && p.rating >= parseInt(minRating));
    }
    if (maxRating) {
      enhanced = enhanced.filter(p => p.rating && p.rating <= parseInt(maxRating));
    }
    if (search) {
      const q = search.toLowerCase();
      enhanced = enhanced.filter(p =>
        p.name.toLowerCase().includes(q) ||
        String(p.contestId).includes(q) ||
        `${p.contestId}${p.index}`.toLowerCase().includes(q)
      );
    }
    if (status) {
      if (status === 'solved') enhanced = enhanced.filter(p => p.userStatus === 'SOLVED');
      if (status === 'attempted') enhanced = enhanced.filter(p => p.userStatus === 'ATTEMPTED');
      if (status === 'unsolved') enhanced = enhanced.filter(p => p.userStatus === 'UNATTEMPTED');
    }
    if (division && division !== 'all') {
      const divTarget = division.toLowerCase();
      enhanced = enhanced.filter(p => {
        const cat = p.divisionCategory;
        if (divTarget === 'div1') return cat === 'div1' || cat === 'div1_div2';
        if (divTarget === 'div2') return cat === 'div2' || cat === 'div1_div2';
        if (divTarget === 'div3') return cat === 'div3';
        if (divTarget === 'div4') return cat === 'div4';
        if (divTarget === 'educational') return cat === 'educational';
        if (divTarget === 'global') return cat === 'global';
        return cat === divTarget;
      });
    }

    // Sorting
    enhanced.sort((a, b) => {
      if (sortBy === 'rating') {
        const rA = a.rating;
        const rB = b.rating;
        if (rA === undefined && rB === undefined) return 0;
        if (rA === undefined) return 1;
        if (rB === undefined) return -1;
        return sortOrder === 'asc' ? rA - rB : rB - rA;
      }
      if (sortBy === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      if (sortBy === 'contest') {
        return sortOrder === 'asc' ? a.contestId - b.contestId : b.contestId - a.contestId;
      }
      return 0;
    });

    // Extract available tags for filter UI
    const allTagsSet = new Set();
    problems.forEach(p => {
      if (Array.isArray(p.tags)) {
        p.tags.forEach(t => allTagsSet.add(t));
      }
    });

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const totalCount = enhanced.length;
    const totalPages = Math.ceil(totalCount / limitNum);
    const startIndex = (pageNum - 1) * limitNum;
    const paginated = enhanced.slice(startIndex, startIndex + limitNum);

    res.json({
      success: true,
      totalCount,
      totalPages,
      currentPage: pageNum,
      availableTags: Array.from(allTagsSet).sort(),
      data: paginated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch problemset' });
  }
};

export const getProblemByContestAndIndex = async (req, res) => {
  try {
    const { contestId, index } = req.params;
    const [data, contestsList] = await Promise.all([
      codeforcesService.getProblemSet(),
      codeforcesService.getContests(false).catch(() => [])
    ]);

    const problem = (data.problems || []).find(
      p => String(p.contestId) === String(contestId) && String(p.index).toUpperCase() === String(index).toUpperCase()
    );

    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }

    const contest = (contestsList || []).find(c => String(c.id) === String(contestId));
    const classification = contest ? classifyContest(contest.name) : { division: 'Other', category: 'other' };
    const editorialUrl = getEditorialUrl(contestId);

    res.json({
      success: true,
      data: {
        ...problem,
        division: classification.division,
        divisionCategory: classification.category,
        editorialUrl,
        url: `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch problem details' });
  }
};
