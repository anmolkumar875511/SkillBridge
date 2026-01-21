import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true
})


axiosInstance.interceptors.response.use(
    (response) => response, // Pass through successful responses
    async (error) => {
        const originalRequest = error.config;

        // Check if error is 401 and we haven't retried this request yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Call your backend refresh endpoint
                // Note: We use the base 'axios' here to avoid an infinite loop
                await axios.post(
                    "http://localhost:5000/api/v1/users/refresh-token", 
                    {}, 
                    { withCredentials: true }
                );

                // If successful, the cookies are updated automatically (httpOnly)
                // Now retry the original request that failed
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // If refresh token is also expired or invalid, log out the user
                console.error("Refresh token failed", refreshError);
                // Optional: window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);



export default axiosInstance;