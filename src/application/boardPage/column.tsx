import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, ButtonGroup } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Column, ColumnBody } from '../../store/reducers/columnsReducer';
import { getColumnById, updateColumnById } from '../../store/reducers/columnsReducer';
import DeleteColumnConfirmation from '../../application/generalComponents/RemoveConfirmation/modalDeleteColumn';
import ModalCreateTask from '../generalComponents/ModalCreateTask/ModalCreateTask';
import TaskPreview from './TaskPreview';
import { selectAllTasks } from '../../store/reducers/tasksReducers';
import { Trans } from 'react-i18next';

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
  const { currentBoard } = useAppSelector(({ boardsReducer }) => boardsReducer);
  const { tasks } = useAppSelector(selectAllTasks);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [open, setOpen] = useState(false);

  const { register, handleSubmit } = useForm<Input>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
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
                  <Button onClick={handleSubmit(updateColumn)}>
                    <Trans i18nKey="boardPage.column.editTitleSubmit">Принять</Trans>
                  </Button>
                  <Button onClick={() => setTitle(false)}>
                    <Trans i18nKey="boardPage.column.editTitleCancel">Отменить</Trans>
                  </Button>
                </ButtonGroup>
              </div>
            )}
          </div>
          <Button className="list-close" data-testid="delete-column" onClick={handleOpen}>
            <DeleteIcon fontSize="small" />
          </Button>
        </div>
        <div className="list">
          {columnTask &&
            columnTask.colTasks?.map((task) => {
              return <TaskPreview key={task.id} {...task} />;
            })}
        </div>
        <Button className="add-card" onClick={handleOpenModal}>
          <AddIcon fontSize="small" />
          <Trans i18nKey="boardPage.column.addTaskBtn">Добавить карточку</Trans>
        </Button>
      </div>
      <DeleteColumnConfirmation {...{ id, handleClose, open }} />
      <ModalCreateTask
        boardId={currentBoard.id}
        columnId={id}
        open={openModal}
        handleClose={handleCloseModal}
      />
    </div>
  );
}
