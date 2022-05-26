import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState } from '../index';
import { axiosInstance } from '../../services/axiosInstance';
import { TaskType } from '../../types/types';

type ColTasksType = {
  colTasks: TaskType[];
  columnId: string;
};

export type TasksState = {
  tasks: ColTasksType[];
  isLoading: boolean;
};

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
};

export const createTask = createAsyncThunk(
  'usersReducer/createTask',
  async (task: Partial<TaskType>, { rejectWithValue, dispatch }) => {
    try {
      const { boardId, columnId, userId, title, description } = task;
      const body = { title, description, userId };
      const response: AxiosResponse = await axiosInstance.post(
        `boards/${boardId}/columns/${columnId}/tasks`,
        body
      );
      const data = await response.data;
      dispatch(getAllTasks({ boardId, columnId }));
      return data;
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

export const getAllTasks = createAsyncThunk(
  'boardsReducer/getAllTasks',
  async (task: Partial<TaskType>, { rejectWithValue, getState }) => {
    try {
      const { boardId } = task;
      const state: RootState = getState() as RootState;
      const columnList = state.columnsReducer.columnList;
      if (columnList.length) {
        const promiseArray = columnList.map((column) => {
          return axiosInstance.get(`boards/${boardId}/columns/${column.id}/tasks`);
        });
        const response = await Promise.all(promiseArray);
        const tasks: ColTasksType[] = response
          .filter((item) => item.data.length)
          .map((item) => {
            return {
              colTasks: item.data as TaskType[],
              columnId: item.data[0].columnId,
            };
          });
        return tasks;
      }
      return [];
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
      .addCase(getTasks['fulfilled'], (state) => {
        state.isLoading = false;
      })
      .addCase(getTasks['pending'], (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks['rejected'], (_, action) => {
        console.error(action.payload as string);
      })
      .addCase(getAllTasks['fulfilled'], (state, { payload }: PayloadAction<ColTasksType[]>) => {
        state.tasks = payload;
        state.isLoading = false;
      })
      .addCase(getAllTasks['pending'], (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTasks['rejected'], (_, action) => {
        console.error(action.payload as string);
      })
      .addCase(createTask['fulfilled'], (state) => {
        state.isLoading = false;
      })
      .addCase(createTask['pending'], (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask['fulfilled'], (state) => {
        state.isLoading = false;
      })
      .addCase(updateTask['pending'], (state) => {
        state.isLoading = true;
      }),
});

export default tasksReducer.reducer;
