import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error.middleware.js';
import { ApiResponse } from './utils/ApiResponse.js';

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
    origin: [
        'https://frontend-of-todo.netlify.app',
        'http://localhost:5173',
        'https://postman.com',
        'chrome-extension://*',  // For Postman desktop app
        'http://localhost:*'     // For local testing
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Security middleware
app.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
});

// Health check route
app.get('/', (req, res) => {
    const response = new ApiResponse(200, { timestamp: new Date() }, 'Todo API is running');
    res.status(response.statusCode).json(response);
});

// Error handling middleware
app.use(errorHandler);

export default app;
