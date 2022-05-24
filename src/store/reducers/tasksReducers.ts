import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { axiosInstance } from '../../services/axiosInstance';
import { TaskType } from '../../types/types';

export type TasksState = {
  tasks: TaskType[];
  isLoading: boolean;
};

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
};

export const createTask = createAsyncThunk(
  'usersReducer/createTask',
  async (task: Partial<TaskType>, { rejectWithValue }) => {
    try {
      const { boardId, columnId, userId, title, description } = task;
      const body = { title, description, userId };
      const response: AxiosResponse = await axiosInstance.post(
        `boards/${boardId}/columns/${columnId}/tasks`,
        body
      );
      return await response.data;
    } catch (err) {
      rejectWithValue((err as Error).message);
    }
  }
);

export const getTasks = createAsyncThunk(
  'boardsReducer/getTasks',
  async (task: Partial<TaskType>, { rejectWithValue }) => {
    try {
      const { boardId, columnId } = task;
      const response: AxiosResponse = await axiosInstance.get(
        `boards/${boardId}/columns/${columnId}/tasks`
      );
      return await response.data;
    } catch (err) {
      rejectWithValue((err as Error).message);
    }
  }
);

export const getTask = createAsyncThunk(
  'boardsReducer/getTask',
  async (task: Pick<TaskType, 'id' | 'columnId' | 'boardId'>, { rejectWithValue }) => {
    try {
      const { boardId, columnId, id } = task;
      const response: AxiosResponse = await axiosInstance.get(
        `boards/${boardId}/columns/${columnId}/tasks/${id}`
      );
      return await response.data;
    } catch (err) {
      rejectWithValue((err as Error).message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'boardsReducer/deleteTask',
  async (task: Pick<TaskType, 'id' | 'columnId' | 'boardId'>, { rejectWithValue }) => {
    try {
      const { boardId, columnId, id } = task;
      const response: AxiosResponse = await axiosInstance.delete(
        `boards/${boardId}/columns/${columnId}/tasks/${id}`
      );
      console.log(JSON.stringify(response));
    } catch (err) {
      rejectWithValue((err as Error).message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'boardsReducer/updateTask',
  async (
    {
      task,
      newTask,
    }: {
      task: Pick<TaskType, 'id' | 'columnId' | 'boardId'>;
      newTask: Omit<TaskType, 'id' | 'files'>;
    },
    { rejectWithValue }
  ) => {
    try {
      const { boardId, columnId, id } = task;
      const response: AxiosResponse = await axiosInstance.put(
        `boards/${boardId}/columns/${columnId}/tasks/${id}`,
        newTask
      );
      return await response.data;
    } catch (err) {
      rejectWithValue((err as Error).message);
    }
  }
);

export const tasksReducer = createSlice({
  name: 'tasksReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getTasks['fulfilled'], (state, { payload }: PayloadAction<TaskType[]>) => {
        state.tasks = payload;
        state.isLoading = false;
      })
      .addCase(getTasks['pending'], (state) => {
        state.isLoading = true;
      })
      .addCase(createTask['pending'], (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask['pending'], (state) => {
        state.isLoading = true;
      })
      .addCase(createTask['fulfilled'], (state) => {
        state.isLoading = false;
      })
      .addCase(updateTask['fulfilled'], (state) => {
        state.isLoading = false;
      })
      .addCase(getTasks['rejected'], (_, action) => {
        console.log(action.payload as string);
      }),
});

export default tasksReducer.reducer;
