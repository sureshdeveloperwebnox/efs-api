import express from 'express';
import 'reflect-metadata';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import { combineRouters } from './routes';
import { ResponseGenerator } from './utils/response-generator';
import { Auth } from './modules/services/auth';
import envConfig from './config/env.config';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration - Must come first
const corsOptions = {
  origin: [
    'http://localhost:9875',
    'http://localhost:6945',
    'http://34.238.172.179:3000',
    'http://34.238.172.179:6945',
    'https://test.easyfieldservices.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Accept']
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Session configuration
app.use(session({
  secret: envConfig.GOOGLE_CLIENT_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    sameSite: 'none', // Required for cross-origin
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple health check route
app.get('/', (req, res) => {
  res.send("Server is running");
});

// Initialize authentication strategies
new Auth();

// Combine all API routers
combineRouters(app);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  ResponseGenerator.send(res, 
    ResponseGenerator.error('Internal server error', 500)
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;