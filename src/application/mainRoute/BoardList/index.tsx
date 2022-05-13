import React from 'react';
import { useAppSelector } from '../../../store';
import BoardItem from '../BoardItem';
import './BoardList.scss';

export default function BoardList() {
  const { boardList } = useAppSelector(({ boardsReducer }) => boardsReducer);

  return (
    <div className="boards-list-container">
      {boardList.length && boardList.map((board) => <BoardItem key={board.id} {...board} />)}
    </div>
  );
}
