import cron from 'node-cron';
import User from '../models/user.model.js';

cron.schedule('0 3 * * *', async () => {
    console.log('[CRON] Running unverified user cleanup...');

    try {
        const EXPIRY_HOURS = 24;

        const expiryDate = new Date(Date.now() - EXPIRY_HOURS * 60 * 60 * 1000);

        const result = await User.deleteMany({
            isEmailVerified: false,
            createdAt: { $lt: expiryDate },
        });

        console.log(`[CRON] Deleted ${result.deletedCount} unverified users`);
    } catch (error) {
        console.error('[CRON] Cleanup failed:', error);
    }
});
