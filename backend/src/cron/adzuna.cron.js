import cron from "node-cron";
import Opportunity from "../models/opportunity.model.js";
import { fetchAdzunaJobs } from "../fetchOpportunity/adzuna.service.js";
import {
  mapCategoryFromText,
  mapOpportunityType,
  mapExperienceLevel,
  extractSkills
} from "../utils/mapCategory.js";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const saveOpportunities = async (jobs) => {
  for (const job of jobs) {
    try {
      const category = mapCategoryFromText(job.title, job.description);
      const opportunityType = mapOpportunityType(job.title, job.description);
      const experienceLevel = mapExperienceLevel(job.title, job.description);
      const requiredSkills = extractSkills(job.description || "");

      const opportunityData = {
        title: job.title,
        company: {
          name: job.company?.display_name || "Unknown"
        },
        description: job.description || "",
        requiredSkills,
        category,
        opportunityType,
        experienceLevel,
        location: job.location?.display_name || "Remote",
        stipendOrSalary: {
          min: job.salary_min || 0,
          max: job.salary_max || 0,
          currency: job.salary_currency || "INR"
        },
        applicationLink: job.redirect_url,
        source: "external",
        externalSource: "adzuna",
        externalId: String(job.id),
        isActive: true,
        lastSeenAt: new Date()
      };

      await Opportunity.findOneAndUpdate(
        { externalId: opportunityData.externalId, externalSource: "adzuna" },
        opportunityData,
        { upsert: true }
      );

      console.log(`Upserted: ${opportunityData.title}`);
    } catch (err) {
      console.error("Save error:", err.message);
    }
  }
};

export const runCron = async () => {
  console.log("Adzuna Cron Started:", new Date().toLocaleString());

  const keywords = [
    "software developer",
    "frontend developer",
    "backend developer",
    "full stack developer",
    "data analyst",
    "accountant",
    "doctor",
    "lawyer"
  ];

  for (const keyword of keywords) {
    for (let page = 1; page <= 2; page++) {
      const jobs = await fetchAdzunaJobs({ keyword, page });
      await saveOpportunities(jobs);
      await sleep(1500);
    }
  }

  console.log("Adzuna Cron Finished:", new Date().toLocaleString());
};

cron.schedule("0 3 * * *", async () => {
  try {
    await runCron();
  } catch (err) {
    console.error("Cron failed:", err.message);
  }
});