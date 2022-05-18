import { EnhancedStore } from '@reduxjs/toolkit';
import axios from 'axios';
// import { store } from '../store';

let store: EnhancedStore;

export const injectStore = (_store: EnhancedStore) => {
  store = _store;
};

export const axiosInstance = axios.create({
  baseURL: 'https://kanban-rest-marina-team.herokuapp.com/',
});

axiosInstance.interceptors.request.use(
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

export const boardAxios = axios.create({
  baseURL: 'https://kanban-rest-marina-team.herokuapp.com/',
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${store.getState().auth.token || localStorage.getItem('token') || ''}`,
    'Content-Type': 'application/json',
  },
});
