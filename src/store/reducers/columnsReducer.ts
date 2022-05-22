import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { Board, ModalState } from '../../.d';
import { axiosInstance } from '../../services/axiosInstance';

export interface Column {
  id: string;
  title: string;
  order: number;
}

type ColumnList = Column[];

export type ColumnBody = Omit<Column, 'id'>;

interface IState {
  currentBoard: Board;
  columnBody: ColumnBody;
}

export type ColumnsState = {
  columnList: Column[];
  currentColumn: Column;
  isLoading: boolean;
  modalColumn: ModalState;
};

const initialState: ColumnsState = {
  columnList: [],
  currentColumn: {
    id: '',
    title: '',
    order: 0,
  },
  isLoading: false,
  modalColumn: {
    isOpen: false,
    type: null,
  },
};

export const createColumn = createAsyncThunk<unknown, IState>(
  'columnsReducer/createColumn',
  async ({ currentBoard, columnBody }, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`boards/${currentBoard.id}/columns`, {
        ...columnBody,
      });
      return console.log('Column ' + columnBody.title + ' was created!');
    } catch (err) {
      rejectWithValue((err as Error).message);
    }
  }
);

export const getColumns = createAsyncThunk(
  'columnsReducer/getColumns',
  async (id: string, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.get(`boards/${id}/columns`);
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

// export const updateBoardById = createAsyncThunk(
//   'boardsReducer/updateBoardById',
//   async (board: Board, { rejectWithValue }) => {
//     try {
//       const { id, title, description } = board;
//       await axiosInstance.put(`boards/${id}`, {
//         title,
//         description,
//       });
//       return console.log('Board ' + title + ' was updated!');
//     } catch (err) {
//       rejectWithValue((err as Error).message);
//     }
//   }
// );

export const columnsReducer = createSlice({
  name: 'columnsReducer',
  initialState,
  reducers: {
    setModalState: (state, { payload }: PayloadAction<ModalState>) => {
      state.modalColumn = payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getColumns['fulfilled'], (state, { payload }: PayloadAction<ColumnList>) => {
        state.columnList = payload;
        state.isLoading = false;
      })
      .addCase(getColumns['pending'], (state) => {
        state.isLoading = true;
      })
      .addCase(getColumns['rejected'], (_, action) => {
        console.log(action.payload as string);
      }),
  // .addCase(getBoardById['fulfilled'], (state, { payload }: PayloadAction<Column>) => {
  //   state.currentBoard = payload;
  //   state.isLoading = false;
  // })
  // .addCase(getBoardById['pending'], (state) => {
  //   state.isLoading = true;
  // })
  // .addCase(getBoardById['rejected'], (_, action) => {
  //   console.log(action.payload as string);
  // }),
});

export const { setModalState } = columnsReducer.actions;
export default columnsReducer.reducer;
