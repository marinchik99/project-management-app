import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';

export default function modalForm() {
  const dispatch = useAppDispatch();
  const { isLoading, boardList } = useAppSelector(({ boardsReducer }) => boardsReducer);

  return <div className="modal-form">
    
  </div>;
}
