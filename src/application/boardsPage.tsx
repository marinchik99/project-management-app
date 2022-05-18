import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';

import '../css/boardsPage.css';

import Preloader from './generalComponents/preloader';
import Search from './mainRoute/search';
import AddBoardBtn from './mainRoute/addBoardBtn';
import BoardList from './mainRoute/boardList';
import { getBoards } from '../store/reducers/boardsReducer';
import ModalForm from './generalComponents/modalForm';

export default function BoardsPage() {
  const { isLoading, boardList, modal } = useAppSelector(({ boardsReducer }) => boardsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch, boardList]);

  return (
    <div className="container boards-page">
      <h1>Boards</h1>
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
