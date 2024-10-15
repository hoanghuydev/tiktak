import axios from 'axios';
import { SERVER_URL, URL_CLIENT } from './utils/constants';
export const baseURL: string = SERVER_URL + '/api/v1/';
export const clientURL: string = URL_CLIENT;
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';

export const axiosNoToken = axios.create({
  baseURL,
  withCredentials: true,
});
export const axiosToken = axios.create({
  baseURL,
  headers: {
    token: localStorage.getItem('accessToken'),
  },
  withCredentials: true,
});

// Request interceptor to refresh the token if it is expired
axiosToken.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('accessToken') || '';
  const date = new Date();
  if (accessToken) {
    const decodedToken = jwtDecode(accessToken);
    if (decodedToken.exp! < date.getTime() / 1000) {
      try {
        const resp: { accessToken: string } = await axiosNoToken.post(
          '/auth/token/refresh'
        );
        localStorage.setItem('accessToken', resp.accessToken);
      } catch (error) {
        console.error('Token refresh failed:', error);
        localStorage.removeItem('accessToken');
      }
    }
    config.headers['token'] = accessToken;
  }
  return config;
});

// Response interceptor to handle unauthorized errors (e.g., 401 or custom "You're not auth")
axiosToken.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('You are not authorized. Removing access token.');
      localStorage.removeItem('accessToken');
    }
    return Promise.reject(error);
  }
);
