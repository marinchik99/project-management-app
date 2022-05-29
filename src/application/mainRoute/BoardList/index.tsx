import React from 'react';
import { useAppSelector } from '../../../store';
import AddBoardBtn from '../AddBoardBtn';
import BoardItem from '../BoardItem';
import './BoardList.scss';

export default function BoardList() {
  const { boardList } = useAppSelector(({ boardsReducer }) => boardsReducer);

  return (
    <div className="board-list-container">
      <AddBoardBtn />
      {boardList.map((board) => (
        <BoardItem key={board.id} {...board} />
      ))}
    </div>
  );
}
