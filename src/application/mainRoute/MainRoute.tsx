import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { getBoards } from '../../store/reducers/boardsReducer';

import './MainRoute.scss';

import Preloader from '../generalComponents/preloader';
import Search from './Search';
import AddBoardBtn from './AddBoardBtn';
import BoardList from './BoardList';
import ModalForm from '../generalComponents/ModalForm';
import theme from '../../utils/themeSettings';
import { ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';

export default function MainRoute() {
  const { isLoading, boardList, modal } = useAppSelector(({ boardsReducer }) => boardsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch, JSON.stringify(boardList)]);

  return (
    <ThemeProvider theme={theme}>
      <main className="boards-page-wrapper">
        <div className="container boards-page">
          <Search />
          <h1 className="boards-page__title page-title">Доски</h1>
          {isLoading ? (
            <Preloader />
          ) : (
            <>
              <BoardList />
              {modal.isOpen && modal.type === 'board' && <ModalForm />}
            </>
          )}
        </div>
      </main>
    </ThemeProvider>
  );
}
