import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';

import './BoardsPage.scss';

import Preloader from '../generalComponents/preloader';
import Search from './Search';
import AddBoardBtn from './AddBoardBtn';
import BoardList from './BoardList';
import { getBoards } from '../../store/reducers/boardsReducer';
import ModalForm from '../generalComponents/ModalForm/ModalForm';

export default function BoardsPage() {
  const { isLoading, boardList, modal } = useAppSelector(({ boardsReducer }) => boardsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch, boardList, isLoading]);

  return (
    <div className="container boards-page">
      <h1>Доски</h1>
      <Search />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <BoardList />
          <AddBoardBtn />
          {modal.isOpen && modal.type === 'board' && <ModalForm />}
        </>
      )}
    </div>
  );
}
