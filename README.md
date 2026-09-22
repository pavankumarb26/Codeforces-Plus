# Codeforces Platform

A modern, production-quality personal Codeforces command center that organizes Codeforces contests, problems, submissions, performance analytics, and profile information in one clean, dark-themed dashboard.

---

## 🚀 Project Overview

**Codeforces Platform** acts as an intelligence and productivity management layer around Codeforces. Rather than replacing Codeforces, it connects directly to the official Codeforces API to synthesize statistics, highlight upcoming contests, explore problems with deep filtering, track submission histories, and bookmark saved problems in MongoDB.

- **Frontend**: React (Vite) + Tailwind CSS + Lucide Icons + React Router DOM
- **Backend**: Node.js + Express.js + Axios + MongoDB / Mongoose + Server-Side TTL Caching
- **Source of Truth**: Official Codeforces REST API (`codeforces.com/api/*`)

---

## 🛠️ Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    React + Vite Frontend                    │
│   (Tailwind CSS, Lucide Icons, React Router, Recharts/SVG)  │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / REST API (Axios)
┌──────────────────────────────▼──────────────────────────────┐
│                    Node.js + Express Backend                │
│    (Controllers, Routes, Codeforces Service, Middleware)    │
├──────────────────────────────┬──────────────────────────────┤
│                              │                              │
│   In-Memory Cache (TTL)      │     MongoDB + Mongoose       │
│   (Codeforces API responses) │   (Saved Problems, Settings) │
└──────────────┬───────────────┴──────────────────────────────┘
               │ HTTP API Requests
┌──────────────▼──────────────┐
│       Codeforces API        │
│   (codeforces.com/api/*)    │
└─────────────────────────────┘
```

> [!NOTE]
> **Data Storage Principle**: MongoDB only stores application-specific data (user handle preferences, visual themes, saved problem bookmarks). Official Codeforces data (contests, problemset, submissions, profile ratings) is fetched directly from Codeforces API and cached in server memory to minimize external API load.

---

## ✨ Features

1. **Personal Dashboard**
   - Live profile summary (@handle, rank, rating, max rating, avatar).
   - Real-time statistics (solved count, attempted count, acceptance rate).
   - Upcoming contest countdown widget.
   - Recent submissions overview with visual verdict indicators.
   - Quick navigation shortcuts.

2. **Contest Browser**
   - Filter contests by status (Upcoming vs Past Archives).
   - Search by name or filter by division (Div. 1, Div. 2, Div. 3, Div. 4, Educational).
   - Start times, duration, live countdowns, and direct external links to Codeforces.

3. **Problem Explorer**
   - Powerful Codeforces problem set browser.
   - Search by problem title or contest ID.
   - **Division Filter**: Filter problems by official contest division (Div. 1, Div. 2, Div. 3, Div. 4, Educational, Global) derived directly from contest metadata (not inferred from problem rating).
   - Filter by rating range (e.g. 800-2400), topic tags, and user status relative to current handle (Solved, Attempted, Unattempted).
   - **Direct Submit Solution Actions**: Pre-selects problem code (e.g. `2011C` or `1900A`) in official Codeforces submission page (`https://codeforces.com/problemset/submit?submittedProblemCode={contestId}{index}`).
   - **Official Editorial Links**: Direct `[ Editorial ↗ ]` buttons linking to official Codeforces blog entries (`codeforces.com/blog/entry/...`) when available.
   - Instant one-click problem bookmarking/saving.
   - Direct external links to problem pages on `codeforces.com`.

4. **Submission History**
   - Full submission log for any handle.
   - Filter by verdict (Accepted, Wrong Answer, TLE, RTE, CE, MLE) and programming language.
   - Technical execution metrics (time consumed in ms, memory consumed in MB).

5. **Performance Analytics**
   - Descriptive performance metrics (no fake data or ML predictions).
   - Solved problem difficulty distribution.
   - Topic tag strength breakdown.
   - Verdict breakdown percentages & programming language usage.

6. **Saved Problems & Settings**
   - Bookmarked problems persisted in MongoDB (with automatic fallback to in-memory store if MongoDB is offline).
   - Change active Codeforces handle anytime.
   - Dark mode design system.

7. **Codeforces Guide & Learn Section (`/learn`)**
   - Educational knowledge base explaining contest lifecycles, division eligibility, rating title scales, problem ratings vs user ratings, judging verdict meanings (OK, WA, TLE, MLE, RTE, CE, PE), virtual contest practice benefits, and CP term glossary.

---

## 📂 Folder Structure

```
codeforces-platform/
│
├── client/                     # Frontend React (Vite) Application
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI, Layouts, Tables, Badges, Skeletons
│   │   │   ├── common/
│   │   │   └── layout/
│   │   ├── context/            # UserContext (Handle state, Saved problems)
│   │   ├── pages/              # Dashboard, Contests, Problems, Submissions, Performance, Saved, Settings, Profile, NotFound
│   │   ├── services/           # Axios API client
│   │   ├── utils/              # Formatters, rank colors, countdowns
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── server/                     # Backend Express.js Server
│   ├── config/                 # MongoDB database & cache configuration
│   ├── controllers/            # Profile, Contest, Problem, Performance, Saved, Settings controllers
│   ├── middleware/             # Error handling middleware
│   ├── models/                 # SavedProblem and UserSetting Mongoose models
│   ├── routes/                 # Express REST API routes
│   ├── services/               # Codeforces API integration service with Axios & TTL cache
│   ├── utils/                  # Stats calculator & memory store fallback
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## ⚙️ Prerequisites & Setup

### Prerequisites
- **Node.js** v18+ (tested on Node v22.20.0)
- **npm** v10+
- **MongoDB** (optional; app automatically runs with an in-memory fallback store if MongoDB is not running locally)

---

## 🚀 Quick Start Guide

### 1. Clone & Setup Environment

Create `server/.env` based on `server/.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/codeforces_platform
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 2. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 3. Run Application

**Start Backend Server (Port 5000):**
```bash
cd server
npm run dev
```

**Start Frontend Development Server (Port 5173):**
```bash
cd client
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 📡 REST API Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/profile/:handle` | Profile info, rating history, and calculated statistics |
| `GET` | `/api/profile/:handle/submissions` | User submission history |
| `GET` | `/api/profile/:handle/rating` | Rating history points |
| `GET` | `/api/contests/upcoming` | List of upcoming Codeforces contests |
| `GET` | `/api/contests/past` | Archive of past finished contests |
| `GET` | `/api/problems` | Codeforces problemset with search, tag, rating, and user status filters |
| `GET` | `/api/performance/:handle` | Aggregated performance breakdown stats |
| `GET` | `/api/saved/:handle` | List bookmarked problems from MongoDB |
| `POST` | `/api/saved` | Bookmark a problem |
| `DELETE` | `/api/saved/:handle/:problemId` | Remove a bookmarked problem |
| `GET` | `/api/settings/:handle` | Get stored user settings |
| `PUT` | `/api/settings/:handle` | Update handle or preferences |

---

## 🔮 Future Machine Learning Integration

*Note: Machine learning is intentionally NOT implemented in this version.*

The backend architecture is structured to accommodate future ML microservices:

```
┌─────────────────┐       ┌─────────────────┐       ┌────────────────────────┐
│  React Frontend ├──────►│ Express Backend ├──────►│ Python FastAPI Service │
└─────────────────┘       └─────────────────┘       └───────────┬────────────┘
                                                                │
                                                    ┌───────────▼────────────┐
                                                    │ Scikit-Learn / PyTorch │
                                                    └────────────────────────┘
```

**Planned ML Features:**
- Personalized problem difficulty recommendation model.
- Solve probability estimation per user and topic.
- Weakness & algorithm topic gap detector.
- Contest rating performance forecasting.
