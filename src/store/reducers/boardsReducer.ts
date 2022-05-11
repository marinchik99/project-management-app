import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Board, BoardBody, BoardList } from '../../.d';

export const baseUrl = 'https://kanban-rest-marina-team.herokuapp.com/';

type BoardsState = {
  boardList: Board[];
  currentBoard: Board;
  search: string;
  isLoading: boolean;
  isModal: boolean;
};

const initialState: BoardsState = {
  boardList: [],
  currentBoard: null,
  search: '',
  isLoading: false,
  isModal: false,
};

export const createBoard = createAsyncThunk(
  'boardsReducer/createBoard',
  async (boardBody: BoardBody, { rejectWithValue }) => {
    try {
      await fetch(`${baseUrl}/boards`, {
        method: 'POST',
        headers: {
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
      const response: Response = await fetch(`${baseUrl}/boards`, {
        method: 'GET',
        headers: {
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
      const response: Response = await fetch(`${baseUrl}/boards/${id}`, {
        method: 'GET',
        headers: {
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
      await fetch(`${baseUrl}/boards/${id}`, {
        method: 'DELETE',
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
      await fetch(`${baseUrl}/boards/${id}`, {
        method: 'PUT',
        headers: {
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
    setModalState: (state, { payload }: PayloadAction<boolean>) => {
      state.isModal = payload;
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
