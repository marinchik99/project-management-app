import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { userApi } from '../services/usersApi';

type AuthState = {
  login: string | null;
  token: string | null;
};

const authInitialState: AuthState = {
  login: localStorage.getItem('login'),
  token: localStorage.getItem('token'),
};

const defaultState: AuthState = {
  login: null,
  token: null,
};

const slice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    logout: (state) => {
      state.token = defaultState.token;
      state.login = defaultState.login;
      localStorage.removeItem('token');
      localStorage.removeItem('login');
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.login = payload.login;
      localStorage.setItem('token', payload.token);
      localStorage.setItem('login', payload.login);
    });
  },
});

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.token;
export const { logout } = slice.actions;
