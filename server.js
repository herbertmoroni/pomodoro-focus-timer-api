const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const AppError = require('./utils/AppError');
const admin = require('firebase-admin');

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  })
});

const app = express();
const port = process.env.PORT || process.env.PORT;

// Global Middleware
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));


// Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

const connectDB = require('./db/connection');
connectDB();

// Routes
app.use('/', require('./routes'));


// Handle undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server running at: `);
    console.log(`➜ Local: \x1b[34mhttp://localhost:${port}\x1b[0m`);
    console.log(`➜ Press \x1b[33mCTRL+C\x1b[0m to stop the server`);
  });