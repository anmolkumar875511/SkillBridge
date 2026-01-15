import cron from "node-cron";
import { runJobsForAllDomains } from "../fetchOpportunity/domainJobRunner.js";

export const startDomainJobsCron = () => {
  cron.schedule("53 21 * * *", async () => {
    try {
      console.log("[CRON] Fetching jobs for all domains");
      await runJobsForAllDomains();
      console.log("[CRON] Jobs fetched for all domains");
    } catch (err) {
      console.error("[CRON ERROR]", err.message);
    }
  });
};