import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import boardsReducer from './reducers/boardsReducer';
import { userApi } from './services/users';

export const store = configureStore({
  reducer: {
    boardsReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
