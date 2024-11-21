import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
    origin: ['https://frontend-of-todo.netlify.app', 'http://localhost:5173'],
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
    // Remove sensitive headers
    res.removeHeader('X-Powered-By');
    // Add security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
});

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Todo API!' });
});

// Jokes API
app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            id: 1,
            setup: "Why do programmers prefer dark mode?",
            punchline: "Because light attracts bugs!"
        },
        {
            id: 2,
            setup: "What's a programmer's favorite place in the house?",
            punchline: "The living ROM!"
        },
        {
            id: 3,
            setup: "Why do Java developers wear glasses?",
            punchline: "Because they don't C#!"
        },
        {
            id: 4,
            setup: "What did the JavaScript developer say to the Python developer?",
            punchline: "You're not my type!"
        },
        {
            id: 5,
            setup: "Why did the developer go broke?",
            punchline: "Because he used up all his cache!"
        }
    ];
    res.json(jokes);
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});