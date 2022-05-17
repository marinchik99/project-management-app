import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { SubmitHandler, useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import './ModalForm.scss';
import { BoardBody } from '../../../.d';
import { createBoard, setModalState } from '../../../store/reducers/boardsReducer';
import { Container } from '@mui/material';

type Inputs = {
  title: string;
  description: string;
};

export default function ModalForm() {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector(({ boardsReducer }) => boardsReducer);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: BoardBody) => {
    dispatch(createBoard(data));
    console.log(data);
    dispatch(setModalState({ isOpen: false, type: null }));
  };

  const handleClose = () => {
    dispatch(setModalState({ isOpen: false, type: null }));
  };

  const style = {
    // eslint-disable-next-line
    position: 'absolute' as 'absolute',
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
        open={modal.isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Создать доску
          </Typography>
          <Container id="modal-modal-description" sx={{ mt: 2 }}>
            <form className="form form--board" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="form-title-input">Заголовок доски</label>
              <input
                id="form-title-input"
                className="form__input-text"
                {...register('title', { required: true })}
              />
              {errors.description && (
                <span className="form__error-text">*Это поле обязательно для заполнения</span>
              )}

              <label htmlFor="form-description-input">Описание</label>
              <textarea
                id="form-description-input"
                className="form__textarea"
                rows={5}
                {...register('description')}
              />

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
