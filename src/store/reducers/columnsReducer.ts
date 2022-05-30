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
  columnBody?: ColumnBody;
  id?: string;
  title?: string;
  order?: number;
}

export type ColumnsState = {
  columnList: Column[];
  currentColumn: Column;
  isLoading: boolean;
  modalColumn: ModalState;
  modalDeleteColumn: ModalState;
  isRender: boolean;
};

const initialState: ColumnsState = {
  columnList: [],
  currentColumn: {
    id: '',
    title: '',
    order: 0,
  },
  isLoading: false,
  isRender: false,
  modalColumn: {
    isOpen: false,
    type: null,
  },
  modalDeleteColumn: {
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

export const getColumnById = createAsyncThunk<unknown, IState>(
  'columnsReducer/getColumnById',
  async ({ currentBoard, id }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        `boards/${currentBoard.id}/columns/${id}`
      );
      return await response.data;
    } catch (err) {
      rejectWithValue((err as Error).message);
    }
  }
);

export const deleteColumnById = createAsyncThunk<unknown, IState>(
  'columnsReducer/deleteColumnById',
  async ({ currentBoard, id }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`boards/${currentBoard.id}/columns/${id}`);
    } catch (err) {
      rejectWithValue((err as Error).message);
    }
  }
);

export const updateColumnById = createAsyncThunk<unknown, IState>(
  'columnsReducer/updateColumnById',
  async ({ currentBoard, id, columnBody, order }, { rejectWithValue }) => {
    try {
      await axiosInstance.put(`boards/${currentBoard.id}/columns/${id}`, {
        ...columnBody,
        order,
      });
    } catch (err) {
      rejectWithValue((err as Error).message);
    }
  }
);

export const columnsReducer = createSlice({
  name: 'columnsReducer',
  initialState,
  reducers: {
    setModalState: (state, { payload }: PayloadAction<ModalState>) => {
      state.modalColumn = payload;
    },
    setModalDeleteState: (state, { payload }: PayloadAction<ModalState>) => {
      state.modalDeleteColumn = payload;
    },
    setRender: (state, { payload }: PayloadAction<boolean>) => {
      state.isRender = payload;
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
        //console.log(action.payload as string);
      }),
});

export const { setModalState, setModalDeleteState, setRender } = columnsReducer.actions;
export default columnsReducer.reducer;
