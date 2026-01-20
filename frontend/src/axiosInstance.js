import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true
})

axiosInstance.interceptors.response.use(
  (response) => response, // If the request succeeds, just return the response
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is 401 (Unauthorized) and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 1. Call your backend's refresh token endpoint
        // This endpoint should check the Refresh Cookie and issue a new Access Cookie/Token
        await axios.post(
          `${axiosInstance.defaults.baseURL}/user/refresh-token`, 
          {}, 
          { withCredentials: true }
        );

        // 2. If successful, retry the original request that failed
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 3. If the refresh token is also expired or invalid, log the user out
        console.error("Session expired. Redirecting to login...");
        
        // Clear local storage if you store user data there
        localStorage.removeItem('user'); 
        
        // Redirect to login page
        window.location.href = '/login'; 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;