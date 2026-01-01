import dotenv from 'dotenv';
import connectDB from './src/db/index.js';
import {app} from './app.js';
import { createDefaultAdmin } from './src/utils/defaultAdmin.js';

dotenv.config({path: "./.env"});

const PORT = process.env.PORT || 5000;

connectDB().then( async () => {

    await createDefaultAdmin();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to connect to the database:', error);
});