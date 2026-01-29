import dotenv from 'dotenv';
import connectDB from './db/index.js';
import app from './app.js';
import { createDefaultAdmin } from './utils/defaultAdmin.js';

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 5000;

connectDB()
    .then(async () => {
        await createDefaultAdmin();

        if (process.env.NODE_ENV !== 'production') {
            app.listen(process.env.PORT || 8000, () => {
                console.log(`Server is running at: http://localhost:${PORT}`);
            });
        }
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
    });

export default app;
