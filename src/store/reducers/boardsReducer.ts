import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { Board, BoardBody, BoardList, ModalState } from '../../.d';
import { axiosInstance } from '../../services/axiosInstance';

export type BoardsState = {
  boardList: Board[];
  currentBoard: Board;
  search: string;
  isLoading: boolean;
  modal: ModalState;
};

const initialState: BoardsState = {
  boardList: [],
  currentBoard: {
    id: '',
    title: '',
    description: '',
  },
  search: '',
  isLoading: false,
  modal: {
    isOpen: false,
    type: null,
  },
};

export const createBoard = createAsyncThunk(
  'boardsReducer/createBoard',
  async (boardBody: BoardBody, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`boards`, {
        ...boardBody,
      });
      return console.log('Board ' + boardBody.title + ' was created!');
    } catch (err) {
      rejectWithValue((err as Error).message);
    }
  }
);

export const getBoards = createAsyncThunk(
  'boardsReducer/getBoards',
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.get(`boards`);
      return await response.data;
    } catch (err) {
      rejectWithValue((err as Error).message);
    }
  }
);

export const getBoardById = createAsyncThunk(
  'boardsReducer/getBoardById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.get(`boards/${id}`);
      return await response.data;
    } catch (err) {
      rejectWithValue((err as Error).message);
    }
  }
);

export const deleteBoardById = createAsyncThunk(
  'boardsReducer/deleteBoardById',
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`boards/${id}`);
      return console.log('Board ' + id + ' was deleted!');
    } catch (err) {
      rejectWithValue((err as Error).message);
    }
  }
);

export const updateBoardById = createAsyncThunk(
  'boardsReducer/updateBoardById',
  async (board: Board, { rejectWithValue }) => {
    try {
      const { id, title, description } = board;
      await axiosInstance.put(`boards/${id}`, {
        title,
        description,
      });
      return console.log('Board ' + title + ' was updated!');
    } catch (err) {
      rejectWithValue((err as Error).message);
    }
  }
);

export const boardsReducer = createSlice({
  name: 'boardsReducer',
  initialState,
  reducers: {
    setModalState: (state, { payload }: PayloadAction<ModalState>) => {
      state.modal = payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getBoards['fulfilled'], (state, { payload }: PayloadAction<BoardList>) => {
        state.boardList = payload;
        state.isLoading = false;
      })
      .addCase(getBoards['pending'], (state) => {
        state.isLoading = true;
      })
      .addCase(getBoards['rejected'], (_, action) => {
        console.log(action.payload as string);
      })
      .addCase(getBoardById['fulfilled'], (state, { payload }: PayloadAction<Board>) => {
        state.currentBoard = payload;
        state.isLoading = false;
      })
      .addCase(getBoardById['pending'], (state) => {
        state.isLoading = true;
      })
      .addCase(getBoardById['rejected'], (_, action) => {
        console.log(action.payload as string);
      }),
});

export const { setModalState } = boardsReducer.actions;
export default boardsReducer.reducer;
