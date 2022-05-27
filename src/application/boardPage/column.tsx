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
import ModalCreateTask from '../generalComponents/ModalCreateTask/ModalCreateTask';
import TaskPreview from './TaskPreview';
import { selectAllTasks } from '../../store/reducers/tasksReducers';

type Input = {
  id: string;
  title: string;
  order: number;
};

export default function ColumnList(props: Column) {
  const dispatch = useAppDispatch();
  const { id, title, order } = props;
  const [changeTitle, setTitle] = useState(false);
  const [changeUpdateTitle, setUpdateTitle] = useState(title);
  const { modalDeleteColumn } = useAppSelector(({ columnsReducer }) => columnsReducer);
  const { currentBoard } = useAppSelector(({ boardsReducer }) => boardsReducer);
  const { tasks } = useAppSelector(selectAllTasks);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
    setUpdateTitle(columnBody.title);
    setTimeout(() => dispatch(getColumnById({ currentBoard, id })), 100);
  };

  const columnTask = tasks.length
    ? tasks.filter((column) => column.columnId === props.id)[0]
    : null;

  return (
    <div className="list-container">
      <div className="list-block">
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
          {columnTask &&
            columnTask.colTasks?.map((task) => {
              return (
                <TaskPreview key={task.id} title={task.title} description={task.description} />
              );
            })}
        </div>
        <Button className="add-card" onClick={handleOpenModal}>
          <AddIcon fontSize="small" />
          Добавить карточку
        </Button>
      </div>
      {modalDeleteColumn.isOpen && modalDeleteColumn.type === 'column' && (
        <DeleteColumnConfirmation id={id} />
      )}
      <ModalCreateTask
        boardId={currentBoard.id}
        columnId={id}
        open={openModal}
        handleClose={handleCloseModal}
      />
    </div>
  );
}
