import { useContext, useEffect } from "react";
import axiosInstance from "./axiosInstance";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";

const AxiosInterceptor = ({ children }) => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const responseInterceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                // 1. DONT intercept if it's the Login or Register request
                // This prevents the "Refresh token missing" error when login fails
                if (originalRequest.url.includes("/user/login") || 
                    originalRequest.url.includes("/user/register")) {
                    return Promise.reject(error);
                }

                // 2. EXCLUDE ADMIN: If user is admin, skip refresh logic
                if (user?.role === 'admin') {
                    console.log("Admin detected - bypassing refresh logic.");
                    return Promise.reject(error);
                }

                // 3. REFRESH LOGIC for Students/others
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        console.log("Attempting token refresh for student...");
                        await axios.post(
                            "http://localhost:5000/api/v1/user/refresh-token",
                            {},
                            { withCredentials: true }
                        );
                        // Retry the original request
                        return axiosInstance(originalRequest);
                    } catch (refreshError) {
                        console.error("Refresh token failed", refreshError);
                        // Optional: Clear user state or redirect to login here
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => axiosInstance.interceptors.response.eject(responseInterceptor);
    }, [user]); 

    return children;
};

export default AxiosInterceptor;