import axios from "axios";

export async function fetchJobsFromFindWork(keyword) {
  const response = await axios.get(
    process.env.FINDWORK_BASE_URL,
    {
      headers: {
        Authorization: `Token ${process.env.FINDWORK_API_KEY}`
      },
      params: {
        search: keyword
      }
    }
  );

  return response.data.results || [];
}