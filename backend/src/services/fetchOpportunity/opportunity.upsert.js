import Opportunity from "../../models/opportunity.model.js";

export const upsertOpportunity = async (data) => {
  return Opportunity.findOneAndUpdate(
    {
        externalId: data.externalId,
        externalSource: data.externalSource
    },
    {
        $set: data
    },
    {
        upsert: true,
        new: true
    }
);
};