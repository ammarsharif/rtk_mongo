import { getToken } from './getAuthToken';
import axios from 'axios';

const api = axios.create({
  timeout: 1000,
  headers: { 'X-Custom-Header': 'footBar' },
});

api.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${getToken()}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
    } else return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const apiRequest = async (url, method, body) => {
  try {
    switch (method) {
      case 'get':
        return api.get(url);
      case 'delete':
        return api.delete(url);
      case 'post':
        return api.post(url, body);
      case 'patch':
        return api.patch(url, body);
      case 'put':
        return api.put(url, body);
      default:
        return api.get(url);
    }
  } catch (err) {
    return new Promise((resolve, reject) => {
      reject({ error: '' });
    });
  }
};
