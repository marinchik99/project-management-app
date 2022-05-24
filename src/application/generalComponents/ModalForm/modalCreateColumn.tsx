import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { SubmitHandler, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './ModalForm.scss';
import { getColumns, createColumn, setModalState } from '../../../store/reducers/columnsReducer';
import { Container } from '@mui/material';
import { ColumnBody } from '../../../store/reducers/columnsReducer';
import { useParams } from 'react-router-dom';

type Inputs = {
  title: string;
  order: number;
};

export default function ModalCreateColumn() {
  const dispatch = useAppDispatch();
  const { modalColumn } = useAppSelector(({ columnsReducer }) => columnsReducer);
  const { currentBoard } = useAppSelector(({ boardsReducer }) => boardsReducer);
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (columnBody: ColumnBody) => {
    dispatch(createColumn({ currentBoard, columnBody }));
    dispatch(setModalState({ isOpen: false, type: null }));
    setTimeout(() => dispatch(getColumns(params.id)), 0);
  };

  const handleClose = () => {
    dispatch(setModalState({ isOpen: false, type: null }));
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="modal-form">
      <Modal
        open={modalColumn.isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Создать колонку
          </Typography>
          <Container id="modal-modal-description" sx={{ mt: 2 }}>
            <form className="form form--board" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="form-title-input">Заголовок колонки</label>
              <input
                id="form-title-input"
                className="form__input-text"
                {...register('title', { required: true })}
              />
              {errors.title && (
                <span className="form__error-text">*Это поле обязательно для заполнения</span>
              )}

              <input data-testid="form-submit-btn" className="form__btn" type="submit" />
              <button
                data-testid="form-close-btn"
                className="form__btn-close"
                onClick={handleClose}
              ></button>
            </form>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
