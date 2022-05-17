import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Board, BoardBody, BoardList, ModalState } from '../../.d';

export const baseUrl = 'https://kanban-rest-marina-team.herokuapp.com/';
const tempToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlZTViODM1ZC03NDQ3LTQwMDgtODg2OS1mZTgyZjgwNzhhZjgiLCJsb2dpbiI6InVzZXIxMyIsImlhdCI6MTY1MjQ3MDMxMn0.cF1yvtcgjdY2TDHbR3IiVRNWcZwbykQUJF5Z5HZsrn4';

export type BoardsState = {
  boardList: Board[];
  currentBoard: Board;
  search: string;
  isLoading: boolean;
  modal: ModalState;
};

const initialState: BoardsState = {
  boardList: [],
  currentBoard: null,
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
      await fetch(`${baseUrl}boards`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tempToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(boardBody),
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
      const response: Response = await fetch(`${baseUrl}boards`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${tempToken}`,
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (err) {
      rejectWithValue((err as Error).message);
    }
  }
);

export const getBoardById = createAsyncThunk(
  'boardsReducer/getBoardById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response: Response = await fetch(`${baseUrl}boards/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${tempToken}`,
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (err) {
      rejectWithValue((err as Error).message);
    }
  }
);

export const deleteBoardById = createAsyncThunk(
  'boardsReducer/deleteBoardById',
  async (id: string, { rejectWithValue }) => {
    try {
      await fetch(`${baseUrl}boards/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${tempToken}`,
        },
      });
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
      await fetch(`${baseUrl}boards/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${tempToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
        }),
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
