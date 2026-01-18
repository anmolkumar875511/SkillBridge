import {
  mapOpportunityType,
  mapExperienceLevel,
  extractSkills
} from "../../utils/mappers.js";

export const mapAdzunaToOpportunity = (job, domain) => {
  return {
    title: job.title,
    company: {
      name: job.company?.display_name || "Unknown"
    },
    description: job.description,
    requiredSkills: extractSkills(job.description, domain),
    category: domain,
    opportunityType: mapOpportunityType(job.title, job.description),
    experienceLevel: mapExperienceLevel(job.title, job.description),
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
    lastSeenAt: new Date()
  };
};