import React, { useState, useRef, useEffect } from 'react';
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
  setRender,
  getColumns,
} from '../../store/reducers/columnsReducer';
import { ModalState } from '../../.d';
import DeleteColumnConfirmation from '../../application/generalComponents/RemoveConfirmation/modalDeleteColumn';
import { useDrag, useDrop } from 'react-dnd';

type Input = {
  id: string;
  title: string;
  order: number;
};

export default function ColumnList(props: Column) {
  const dispatch = useAppDispatch();
  const { id, title, order } = props;
  console.log(props);
  const [changeTitle, setTitle] = useState(false);
  const [current, setCurrentColumn] = useState(null);
  const [changeUpdateTitle, setUpdateTitle] = useState(title);
  const { modalDeleteColumn, columnList, currentColumn } = useAppSelector(
    ({ columnsReducer }) => columnsReducer
  );
  const { currentBoard } = useAppSelector(({ boardsReducer }) => boardsReducer);
  const [cards, setCards] = useState(columnList);
  const { register, handleSubmit } = useForm<Input>();
  let cur: Column = null;

  const deleteColumn = () => {
    const modalDeleteState: ModalState = {
      isOpen: true,
      type: 'column',
    };

    dispatch(setModalDeleteState(modalDeleteState));
  };

  const updateColumn: SubmitHandler<Input> = (columnTitle: ColumnBody) => {
    const columnBody = { title: columnTitle.title, order: order };
    dispatch(updateColumnById({ currentBoard, id, columnBody }));
    setTitle(false);
    setUpdateTitle(columnBody.title);
    setTimeout(() => dispatch(getColumnById({ currentBoard, id })), 100);
  };

  const dragColumn = (props: Column) => {
    console.log(props);
    setCurrentColumn(props);
    dispatch(setRender(props));
    cur = props;
    console.log(cur);
    console.log(current);
    console.log(currentColumn);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'column',
    //end: () => dragColumn(props),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'column',
    drop: (item: Column) => addColumn(props),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addColumn = (column: Column) => {
    setCards(
      cards.map((item) => {
        if (item.id == column.id) {
          const columnBody = { title: item.title, order: currentColumn.order };
          dispatch(updateColumnById({ currentBoard, id, columnBody }));
          return { ...item, order: currentColumn.order };
        }
        if (item.id == currentColumn.id) {
          const columnBody = { title: column.title, order: column.order };
          dispatch(updateColumnById({ currentBoard, id, columnBody }));
          return { ...item, order: column.order };
        }
        return item;
      })
    );
  };

  return (
    <div className="list-container" ref={drop}>
      <div
        className="list-block"
        ref={drag}
        onDragStart={() => dragColumn(props)}
        style={{ border: isDragging ? '5px solid pink' : '0px' }}
      >
        <div className="title-container">
          <div className="list-title">
            {!changeTitle ? (
              <h3 onClick={() => setTitle(true)}> {changeUpdateTitle} </h3>
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
          <Button className="list-close" data-testid="delete-column" onClick={deleteColumn}>
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
