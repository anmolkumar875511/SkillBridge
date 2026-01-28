import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    withCredentials: true,
});

export default axiosInstance;
