import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { axiosInstance } from '../../services/axiosInstance';
import { UserType } from '../../types/types';

export type UsersState = {
  users: Pick<UserType, 'id' | 'name' | 'login'>[];
  isLoading: boolean;
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
};

export const getUsers = createAsyncThunk(
  'usersReducer/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.get(`users`);
      return await response.data;
    } catch (err) {
      rejectWithValue((err as Error).message);
    }
  }
);

export const usersReducer = createSlice({
  name: 'boardsReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(
        getUsers['fulfilled'],
        (state, { payload }: PayloadAction<Pick<UserType, 'id' | 'name' | 'login'>[]>) => {
          state.users = payload;
          state.isLoading = false;
        }
      )
      .addCase(getUsers['pending'], (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers['rejected'], (_, action) => {
        console.log(action.payload as string);
      }),
});

export default usersReducer.reducer;
