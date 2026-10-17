import dotenv from 'dotenv';
// Load environment variables from .env.local first, then fallback to .env
dotenv.config({ path: '.env.local' });
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import userRoutes from './routes/userRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend during development
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
}));

// Mount Webhook route first (uses express.raw() for Svix signature verification)
app.use('/api/webhooks', webhookRoutes);

// Body parser for standard API routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount User routes
app.use('/api/users', userRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'LinkedOut Backend API',
    time: new Date().toISOString(),
  });
});

// Connect to MongoDB and start listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 [Server Running]: LinkedOut backend listening on http://localhost:${PORT}`);
    console.log(`📡 [API Health Check]: http://localhost:${PORT}/api/health`);
    console.log(`🔗 [User Sync Endpoint]: http://localhost:${PORT}/api/users/sync`);
    console.log(`🔔 [Clerk Webhook Endpoint]: http://localhost:${PORT}/api/webhooks/clerk\n`);
  });
});

export default app;
