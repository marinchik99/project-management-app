import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState } from '../index';
import { axiosInstance } from '../../services/axiosInstance';
import { UserType } from '../../types/types';
import { ModalState } from '../../.d';

export type UsersState = {
  users: Pick<UserType, 'id' | 'name' | 'login'>[];
  isLoading: boolean;
  modalDeleteUser: ModalState;
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
  modalDeleteUser: {
    isOpen: false,
    type: null,
  },
};

export interface IUserBody {
  id?: string;
  name: string;
  login: string;
  password: string;
}

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

export const deleteUserById = createAsyncThunk(
  'usersReducer/deleteUserById',
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`users/${id}`);
    } catch (err) {
      rejectWithValue((err as Error).message);
    }
  }
);

export const updateUserById = createAsyncThunk(
  'usersReducer/updateUserById',
  async (user: IUserBody, { rejectWithValue }) => {
    try {
      const { id, name, login, password } = user;
      await axiosInstance.put(`users/${id}`, {
        name,
        login,
        password,
      });
    } catch (err) {
      rejectWithValue((err as Error).message);
    }
  }
);

export const usersReducer = createSlice({
  name: 'usersReducer',
  initialState,
  reducers: {
    setModalDeleteState: (state, { payload }: PayloadAction<ModalState>) => {
      state.modalDeleteUser = payload;
    },
  },
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
        //console.log(action.payload as string);
      }),
});

export const { setModalDeleteState } = usersReducer.actions;
export default usersReducer.reducer;

export const selectUsers = (state: RootState) => {
  return {
    users: state.usersReducer.users,
  };
};
