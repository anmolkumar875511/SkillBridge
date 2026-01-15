import axios from "axios";
import apiError from "../utils/apiError.js";

const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID?.trim();
const ADZUNA_API_KEY = process.env.ADZUNA_API_KEY?.trim();

if (!ADZUNA_APP_ID || !ADZUNA_API_KEY) {
  throw new Error("Adzuna credentials missing in .env");
}

export const fetchAdzunaJobs = async ({
  keyword,
  country = "in",
  page = 1
}) => {
  try {
    const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}`;

    const { data } = await axios.get(url, {
      headers: { Accept: "application/json" },
      params: {
        app_id: ADZUNA_APP_ID,
        app_key: ADZUNA_API_KEY,
        what: keyword.trim(),
        results_per_page: 20
      },
      timeout: 10000
    });

    return data?.results || [];
  } catch (error) {
    console.error("Adzuna Error:", error.response?.data);

    throw new apiError(
      error.response?.status || 500,
      "Adzuna API failed",
      error.response?.data
    );
  }
};
