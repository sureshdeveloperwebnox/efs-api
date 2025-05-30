import express, { Request, Response } from 'express';
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

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const corsOptions = {
  origin: ['http://localhost:9875', 'http://localhost:6945', 'http://34.238.172.179:3000', 'http://34.238.172.179:6945', "https://test.easyfieldservices.com"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly list methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Explicitly list allowed headers
};


app.use(cors(corsOptions));


app.get('/', (req: Request, res: Response) => {
  res.send("server running")
})

// 🛡️ Setup session (required for passport)
app.use(session({
  secret: envConfig.GOOGLE_CLIENT_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
    cookie: {
    secure: false, // Set to true if using HTTPS
    sameSite: 'none', // Important for cross-origin
    httpOnly: true
  }
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

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;