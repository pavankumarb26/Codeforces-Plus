import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

import profileRoutes from './routes/profileRoutes.js';
import contestRoutes from './routes/contestRoutes.js';
import problemRoutes from './routes/problemRoutes.js';
import performanceRoutes from './routes/performanceRoutes.js';
import savedRoutes from './routes/savedRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'https://codeforces-plus.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// API Routes
app.use('/api/profile', profileRoutes);
app.use('/api/contests', contestRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/settings', settingsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    service: 'Codeforces Platform API'
  });
});

// 404 Handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[Server] Codeforces Platform Server running on port ${PORT}`);
});
