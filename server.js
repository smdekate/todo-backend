import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

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