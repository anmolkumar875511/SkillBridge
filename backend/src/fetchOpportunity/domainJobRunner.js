import { DOMAINS } from "../utils/constants.js";
import { fetchAdzunaJobs } from "./adzuna.service.js";
import { mapAdzunaToOpportunity } from "./opportunity.mapper.js";
import { upsertOpportunity } from "./opportunity.upsert.js";

export const runJobsForDomain = async (domain) => {
  const keywords = DOMAINS[domain];
  if (!keywords) throw new Error(`Invalid domain: ${domain}`);

  let savedCount = 0;

  for (const keyword of keywords) {
    const jobs = await fetchAdzunaJobs({ keyword });

    for (const job of jobs) {
      const opportunity = mapAdzunaToOpportunity(job, domain);
      await upsertOpportunity(opportunity);
      savedCount++;
    }
  }

  return { domain, savedCount };
};

export const runJobsForAllDomains = async () => {
  const results = [];

  for (const domain of Object.keys(DOMAINS)) {
    const res = await runJobsForDomain(domain);
    results.push(res);
  }

  return results;
};