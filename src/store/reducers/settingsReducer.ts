import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GlobalSettings = {
  language: string | null;
};

const initialState: GlobalSettings = {
  language: 'ru',
};

const settingsReducer = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setLanguage: (state, { payload }: PayloadAction<string>) => {
      state.language = payload;
    },
  },
});

export const { setLanguage } = settingsReducer.actions;
export default settingsReducer.reducer;
