import cron from "node-cron";
import { ingestFindWorkJobs } from "../services/fetchOpportunity/findWorkIngest.service.js";

const DOMAIN_KEYWORDS = {
  tech: [
    "software developer",
    "frontend developer",
    "backend developer",
    "full stack developer",
    "data engineer",
    "machine learning engineer",
    "devops engineer"
  ],

  medical: [
    "doctor",
    "nurse",
    "medical officer",
    "clinical research",
    "pharmacist"
  ],

  law: [
    "lawyer",
    "legal associate",
    "advocate",
    "paralegal"
  ],

  finance: [
    "accountant",
    "finance analyst",
    "banking officer",
    "investment analyst"
  ],

  education: [
    "teacher",
    "lecturer",
    "professor",
    "education coordinator"
  ],

  design: [
    "ui designer",
    "ux designer",
    "graphic designer",
    "product designer"
  ],

  management: [
    "product manager",
    "project manager",
    "operations manager"
  ]
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runIngestionForKeyword(keyword) {
  try {
    const saved = await ingestFindWorkJobs(keyword);
    console.log(`${saved} jobs ingested for keyword: ${keyword}`);
  } catch (error) {
    console.error(`Failed for keyword "${keyword}":`, error.message);
  }
}

export function startFindWorkCron() {
  cron.schedule("12 21 * * *", async () => {
    console.log("FindWork Cron Started");

    for (const keywords of Object.values(DOMAIN_KEYWORDS)) {
      for (const keyword of keywords) {
        await runIngestionForKeyword(keyword);
        await sleep(1500);
      }
    }

    console.log("FindWork Cron Finished");
  });
}