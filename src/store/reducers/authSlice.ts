import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../../types/types';
import { RootState } from '../index';
import { userApi } from '../services/usersApi';

type AuthState = {
  user: UserType | null;
  token: string | null;
};

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.token = payload.token;
    });
  },
});

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.token;
