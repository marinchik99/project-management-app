import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, ButtonGroup } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Column, ColumnBody } from '../../store/reducers/columnsReducer';
import {
  setModalDeleteState,
  getColumnById,
  updateColumnById,
} from '../../store/reducers/columnsReducer';
import { ModalState } from '../../.d';
import DeleteColumnConfirmation from '../../application/generalComponents/RemoveConfirmation/modalDeleteColumn';

type Input = {
  id: string;
  title: string;
  order: number;
};

export default function ColumnList(props: Column) {
  const dispatch = useAppDispatch();
  const { id, title, order } = props;
  const [changeTitle, setTitle] = useState(false);
  const { modalDeleteColumn } = useAppSelector(({ columnsReducer }) => columnsReducer);
  const { currentBoard } = useAppSelector(({ boardsReducer }) => boardsReducer);

  const { register, handleSubmit } = useForm<Input>();

  const deleteColumn = () => {
    const modalDeleteState: ModalState = {
      isOpen: true,
      type: 'column',
    };

    dispatch(setModalDeleteState(modalDeleteState));
  };

  const updateColumn: SubmitHandler<Input> = (columnBody: ColumnBody) => {
    dispatch(updateColumnById({ currentBoard, id, columnBody, order }));
    setTitle(false);
    setTimeout(() => dispatch(getColumnById({ currentBoard, id })), 100);
  };

  return (
    <div className="list-container">
      <div className="list-block">
        <div className="title-container">
          <div className="list-title">
            {!changeTitle ? (
              <h3 onClick={() => setTitle(true)}> {title} </h3>
            ) : (
              <div className="list-input-container">
                <input className="list-input" type="text" {...register('title')} />
                <ButtonGroup
                  className="list-input-buttons"
                  variant="outlined"
                  size="small"
                  aria-label="small button group"
                >
                  <Button onClick={handleSubmit(updateColumn)}>Submit</Button>
                  <Button onClick={() => setTitle(false)}>Cansel</Button>
                </ButtonGroup>
              </div>
            )}
          </div>
          <Button className="list-close" onClick={deleteColumn}>
            <DeleteIcon fontSize="small" />
          </Button>
        </div>
        <div className="list">
          <div className="list__item">Карточка с содержимым</div>
        </div>
        <Button className="add-card">
          <AddIcon fontSize="small" />
          Добавить карточку
        </Button>
      </div>
      {modalDeleteColumn.isOpen && modalDeleteColumn.type === 'column' && (
        <DeleteColumnConfirmation id={id} />
      )}
    </div>
  );
}
