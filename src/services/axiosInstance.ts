import axios from 'axios';
import { store } from '../store';

export const instance = axios.create({
  baseURL: 'https://kanban-rest-marina-team.herokuapp.com/',
});

instance.interceptors.request.use(
  function (config) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    };
  },
  function (error) {
    return Promise.reject(error);
  }
);
