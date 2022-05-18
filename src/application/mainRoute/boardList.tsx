import React from 'react';
import { useAppSelector } from '../../store';
import BoardItem from './boardItem';

export default function BoardList() {
  const { boardList } = useAppSelector(({ boardsReducer }) => boardsReducer);

  return (
    <div className="boards-list-container">
      {boardList.length && boardList.map((board) => <BoardItem key={board.id} {...board} />)}
    </div>
  );
}
