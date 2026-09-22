export const learnSections = [
  {
    id: 'overview',
    title: 'Overview',
    iconName: 'BookOpen',
    shortDesc: 'Introduction to Codeforces and competitive programming platform workflow.',
    content: {
      heading: 'Introduction to Codeforces',
      paragraphs: [
        'Codeforces is one of the world\'s premier competitive programming platforms. It hosts regular algorithmic contests where participants solve algorithmic and mathematical challenges within strict time constraints.',
        'This Codeforces Platform serves as your personal command center, organizing your contest performance, submission statistics, problem solving history, and bookmarked problems into a unified dashboard.'
      ],
      highlights: [
        {
          title: 'Core Product Principle',
          description: 'This platform is an intelligence layer around Codeforces. Solving problems and participating in contests happen directly on the official Codeforces platform.'
        }
      ]
    }
  },
  {
    id: 'contests',
    title: 'Contests',
    iconName: 'Trophy',
    linkTo: '/contests',
    linkLabel: 'Browse Contests',
    shortDesc: 'Understand contest lifecycle, registration, standing rules, and hacks.',
    content: {
      heading: 'Codeforces Contests & Lifecycle',
      paragraphs: [
        'A Codeforces contest is a timed competitive programming event where participants solve a set of algorithmic problems. Contests typically last between 2 and 3 hours.'
      ],
      lifecycle: [
        {
          phase: 'BEFORE',
          badge: 'Registration Phase',
          color: 'text-amber-400 border-amber-800/50 bg-amber-950/30',
          desc: 'Participants register for the upcoming contest. Registration usually opens 6 hours prior to contest start.'
        },
        {
          phase: 'RUNNING',
          badge: 'Live Contest Phase',
          color: 'text-emerald-400 border-emerald-800/50 bg-emerald-950/30',
          desc: 'Problems are revealed. Participants write code and submit solutions. Submissions are judged against pretests in real time.'
        },
        {
          phase: 'FINISHED',
          badge: 'Final System Testing',
          color: 'text-sky-400 border-sky-800/50 bg-sky-950/30',
          desc: 'System testing is executed on the complete hidden test suite. Official ratings and final standings are calculated.'
        }
      ],
      details: [
        {
          term: 'Rated vs Unrated',
          definition: 'In a rated contest, your performance directly updates your Codeforces rating. Unrated contests or unrated participation do not alter your rating.'
        },
        {
          term: 'Hacks & Challenge Phase',
          definition: 'During or after certain contest rounds (such as Div. 1/Div. 2 rounds), participants can inspect others\' solutions and submit custom counter-test cases (hacks) to expose bugs.'
        },
        {
          term: 'Contest Standings',
          definition: 'Standings are ordered by number of solved problems and penalty time (time taken plus penalty for failed pretest attempts).'
        }
      ]
    }
  },
  {
    id: 'divisions',
    title: 'Divisions',
    iconName: 'Layers',
    linkTo: '/contests',
    linkLabel: 'Filter Contests by Division',
    shortDesc: 'Participant eligibility groups and contest formats.',
    content: {
      heading: 'Codeforces Divisions & Formats',
      note: 'Divisions generally correspond to participant eligibility groups determined by Codeforces rating. Exact eligibility criteria are specified in individual contest announcements.',
      divisionsList: [
        {
          name: 'Div. 4',
          target: 'Beginner / Introductory Level',
          desc: 'Div. 4 contests are intended for participants starting out in competitive programming. Problems focus on basic implementation and logic.'
        },
        {
          name: 'Div. 3',
          target: 'Lower-Rated Participants',
          desc: 'Div. 3 contests cater to lower-rated participants, providing accessible entry-level challenges alongside intermediate algorithms.'
        },
        {
          name: 'Div. 2',
          target: 'Intermediate / Regular Contestants',
          desc: 'Div. 2 is the standard competitive round for most regular participants. Highly rated users participate out-of-competition.'
        },
        {
          name: 'Div. 1',
          target: 'Advanced / High-Rated Competitors',
          desc: 'Div. 1 features high-difficulty algorithmic challenges designed for experienced competitive programmers.'
        },
        {
          name: 'Educational Contests',
          target: 'All Rating Bands (Div. 2 Rated)',
          desc: 'Educational rounds feature standard problem tropes with extended 24-hour hack phases and detailed tutorial editorials.'
        },
        {
          name: 'Global / Combined Contests',
          target: 'Open to All Competitors',
          desc: 'Combined rounds (Div. 1 + Div. 2) where all participants compete in a single shared contest format.'
        }
      ]
    }
  },
  {
    id: 'ratings',
    title: 'Ratings & Ranks',
    iconName: 'Award',
    linkTo: '/performance',
    linkLabel: 'View Performance & Rating',
    shortDesc: 'Rating calculations, rank titles, and color scales.',
    content: {
      heading: 'Ratings & Rank Titles',
      paragraphs: [
        'Codeforces uses an Elo-like rating system. Your rating increases when you outperform your expected rank in a rated contest, and decreases if you perform below expectation.',
        'Rating titles and username color highlights are assigned automatically based on your current rating score:'
      ],
      rankColorScale: [
        { title: 'Newbie', range: '< 1200', color: 'text-slate-400', bg: 'bg-slate-800/80 border-slate-700' },
        { title: 'Pupil', range: '1200 – 1399', color: 'text-emerald-400', bg: 'bg-emerald-950/60 border-emerald-800/50' },
        { title: 'Specialist', range: '1400 – 1599', color: 'text-cyan-400', bg: 'bg-cyan-950/60 border-cyan-800/50' },
        { title: 'Expert', range: '1600 – 1899', color: 'text-blue-400', bg: 'bg-blue-950/60 border-blue-800/50' },
        { title: 'Candidate Master', range: '1900 – 2099', color: 'text-purple-400', bg: 'bg-purple-950/60 border-purple-800/50' },
        { title: 'Master', range: '2100 – 2299', color: 'text-amber-400', bg: 'bg-amber-950/60 border-amber-800/50' },
        { title: 'Grandmaster', range: '2400+', color: 'text-rose-400', bg: 'bg-rose-950/60 border-rose-800/50' }
      ],
      keyConcepts: [
        { name: 'Current Rating', text: 'Your official rating after the latest calculated rated contest.' },
        { name: 'Max Rating', text: 'The highest historical rating peak achieved by your account.' },
        { name: 'Rank vs Max Rank', text: 'Rank reflects your current rating title; Max Rank reflects your peak historical title.' }
      ]
    }
  },
  {
    id: 'problems',
    title: 'Problems',
    iconName: 'Code2',
    linkTo: '/problems',
    linkLabel: 'Explore Problem Set',
    shortDesc: 'Problem difficulty ratings, tags, and status tracking.',
    content: {
      heading: 'Codeforces Problem Structure',
      paragraphs: [
        'Codeforces problemset contains thousands of archived contest problems categorized by estimated difficulty ratings and algorithmic topic tags.'
      ],
      importantDistinction: {
        title: 'Important Distinction',
        text: 'A problem rating (e.g. 1400) is an estimated difficulty difficulty score assigned by Codeforces. It does NOT mean a solver must have a user rating of 1400.'
      },
      problemAttributes: [
        { attr: 'Problem Index', desc: 'Identified by letters (A, B, C, D...). Problem A is typically the easiest in a round, while later letters increase in difficulty.' },
        { attr: 'Problem Rating', desc: 'Difficulty scale ranging from 800 (easiest) up to 3500 (extremely difficult).' },
        { attr: 'Problem Tags', desc: 'Algorithmic topics associated with the problem (e.g., dp, greedy, graphs, math, implementation, data structures).' },
        { attr: 'User Status', desc: 'Tracks whether a problem is Solved (OK verdict), Attempted (unsolved submissions), or Unattempted by your handle.' }
      ]
    }
  },
  {
    id: 'verdicts',
    title: 'Submission Verdicts',
    iconName: 'History',
    linkTo: '/submissions',
    linkLabel: 'Check Submissions History',
    shortDesc: 'Understanding judge execution responses and error codes.',
    content: {
      heading: 'Codeforces Judging Verdicts',
      paragraphs: [
        'When you submit code to Codeforces, the automated judge compiles and executes your solution against test inputs.'
      ],
      verdictsList: [
        { code: 'OK', label: 'Accepted', color: 'text-emerald-400 border-emerald-800/40 bg-emerald-950/40', meaning: 'Your program produced correct outputs within time and memory limits for all test cases.' },
        { code: 'WRONG_ANSWER', label: 'Wrong Answer', color: 'text-rose-400 border-rose-800/40 bg-rose-950/40', meaning: 'Your code produced an incorrect output for at least one test input.' },
        { code: 'TIME_LIMIT_EXCEEDED', label: 'Time Limit Exceeded (TLE)', color: 'text-amber-400 border-amber-800/40 bg-amber-950/40', meaning: 'Your program ran longer than the allowed execution time limit (e.g., 2.0 seconds).' },
        { code: 'MEMORY_LIMIT_EXCEEDED', label: 'Memory Limit Exceeded (MLE)', color: 'text-amber-400 border-amber-800/40 bg-amber-950/40', meaning: 'Your solution allocated more RAM memory than the problem statement limit.' },
        { code: 'RUNTIME_ERROR', label: 'Runtime Error (RTE)', color: 'text-amber-400 border-amber-800/40 bg-amber-950/40', meaning: 'Your program crashed during execution (e.g., array index out of bounds, null pointer, division by zero).' },
        { code: 'COMPILATION_ERROR', label: 'Compilation Error (CE)', color: 'text-purple-400 border-purple-800/40 bg-purple-950/40', meaning: 'The compiler failed to compile your source code due to syntax errors.' },
        { code: 'PRESENTATION_ERROR', label: 'Presentation Error', color: 'text-slate-400 border-slate-700 bg-slate-800', meaning: 'Output formatting mismatch (e.g. missing spaces or newlines).' },
        { code: 'IDLENESS_LIMIT_EXCEEDED', label: 'Idleness Limit Exceeded', color: 'text-slate-400 border-slate-700 bg-slate-800', meaning: 'Program printed output without flushing buffers during interactive problems or went silent.' },
        { code: 'TESTING', label: 'Testing', color: 'text-sky-400 border-sky-800/40 bg-sky-950/40', meaning: 'The submission is currently being evaluated by judge nodes.' },
        { code: 'SKIPPED', label: 'Skipped', color: 'text-slate-400 border-slate-700 bg-slate-800', meaning: 'Test execution was skipped due to hack or contest system testing.' },
        { code: 'CHALLENGED', label: 'Challenged / Hacked', color: 'text-rose-400 border-rose-800/40 bg-rose-950/40', meaning: 'Solution was successfully hacked by another participant during the challenge phase.' }
      ]
    }
  },
  {
    id: 'virtual',
    title: 'Virtual Contests',
    iconName: 'PlayCircle',
    linkTo: '/contests',
    linkLabel: 'Practice Virtual Contests',
    shortDesc: 'Simulate past contests in real time without rating impact.',
    content: {
      heading: 'Virtual Contests',
      paragraphs: [
        'A Virtual Contest allows you to simulate a past finished contest in real-time under exact contest constraints.'
      ],
      benefits: [
        { title: 'Realistic Simulation', text: 'Timer, problem reveals, and submission flow run exactly as if you were participating live.' },
        { title: 'Zero Rating Risk', text: 'Virtual participation is strictly practice and does NOT alter your official Codeforces rating.' },
        { title: 'Targeted Practice', text: 'Great for building time management skills and practicing full contest strategy.' }
      ]
    }
  },
  {
    id: 'glossary',
    title: 'CP Glossary',
    iconName: 'HelpCircle',
    shortDesc: 'Essential competitive programming terms & acronyms.',
    content: {
      heading: 'Competitive Programming Terms & Definitions',
      terms: [
        { term: 'CP', def: 'Competitive Programming — solving algorithmic problems under time constraints.' },
        { term: 'Upsolving', def: 'Solving problems from a contest AFTER the official contest has ended.' },
        { term: 'Editorial', def: 'The official tutorial document explaining solutions for contest problems.' },
        { term: 'Pretests', def: 'Initial small test suite used during live contests to give immediate feedback.' },
        { term: 'System Tests', def: 'The full, hidden test suite executed after the contest ends.' },
        { term: 'Hack', def: 'Submitting a counter-test case to break another participant\'s solution.' },
        { term: 'Accepted (AC)', def: 'Verdict indicating a solution passed all tests.' },
        { term: 'WA', def: 'Wrong Answer verdict.' },
        { term: 'TLE', def: 'Time Limit Exceeded verdict.' },
        { term: 'RTE', def: 'Runtime Error verdict.' },
        { term: 'CE', def: 'Compilation Error verdict.' },
        { term: 'Problemset', def: 'The complete archive of all past Codeforces contest problems.' }
      ]
    }
  }
];
