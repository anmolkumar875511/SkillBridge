import dotenv from 'dotenv';
import connectDB from './db/index.js';
import app from './app.js';
import { createDefaultAdmin } from './utils/defaultAdmin.js';

dotenv.config();

const startServer = async () => {
    try {
        await connectDB();
        await createDefaultAdmin();
        console.log("Database connected and Admin check complete.");

        if (!process.env.VERCEL) {
            const PORT = process.env.PORT || 5000;
            app.listen(PORT, () => {
                console.log(`Local Server: http://localhost:${PORT}`);
            });
        }
    } catch (error) {
        console.error("Server initialization failed:", error.message);
        if (!process.env.VERCEL) process.exit(1);
    }
};

startServer();

export default app;