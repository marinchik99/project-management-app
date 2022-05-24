import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import boardsReducer from './reducers/boardsReducer';
import { userApi } from './services/usersApi';
import authReducer from './reducers/authSlice';
import { addInterceptors } from '../services/axiosInstance';
import settingsReducer from './reducers/settingsReducer';
import columnsReducer from './reducers/columnsReducer';
import usersReducer from './reducers/usersReducer';

export const store = configureStore({
  reducer: {
    boardsReducer,
    settingsReducer,
    columnsReducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
    usersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

addInterceptors();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
