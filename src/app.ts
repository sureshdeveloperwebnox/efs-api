import express from 'express';
import 'reflect-metadata';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors'; // 👈 Added
import { combineRouters } from './routes';
import { ResponseGenerator } from './utils/response-generator';
import { Auth } from './modules/services/auth'; // ✅ Corrected import
import envConfig from './config/env.config';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration - Must come first
const corsOptions = {
  origin: [
    'http://localhost:6945',
    'http://localhost:9875',
    'http://34.201.153.22:3000',
    'http://34.201.153.22:6945',
    'http://test.easyfieldservices.com',
    'https://test.easyfieldservices.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ["*"]
};

// Apply CORS middleware
app.use(cors(corsOptions));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// 🛡️ Setup session (required for passport)
app.use(session({
  secret: envConfig.GOOGLE_CLIENT_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false
}));

// 🛡️ Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// 🧠 Initialize Auth to register Google strategy
new Auth(); // ✅ Register strategies

// 🔀 Setup routes
combineRouters(app);

// 🛠️ Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  ResponseGenerator.send(res, 
    ResponseGenerator.error('Internal server error', 500)
  );
});

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('server is running');
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;