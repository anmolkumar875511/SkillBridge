import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const axiosInstance = axios.create({
    baseURL: 'https://skill-bridge-seven-gamma.vercel.app/api/v1',
    withCredentials: true,
});

export default axiosInstance;
