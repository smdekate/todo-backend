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

// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});