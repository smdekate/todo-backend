import app from './app.js';
import connectDB from './config/db.config.js';

const port = process.env.PORT || 5000;

// Database connection
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed !!! ", err);
    });
