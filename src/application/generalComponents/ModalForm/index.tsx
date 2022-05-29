import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Trans } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../store';
import { BoardBody } from '../../../.d';
import { createBoard, getBoards, setModalState } from '../../../store/reducers/boardsReducer';

import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import './ModalForm.scss';

type Inputs = {
  title: string;
  description: string;
};

export default function ModalForm() {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector(({ boardsReducer }) => boardsReducer);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: BoardBody) => {
    dispatch(createBoard(data));
    dispatch(setModalState({ isOpen: false, type: null }));
    setTimeout(() => dispatch(getBoards()), 0);
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
            <Trans i18nKey="createBoardModal.title">Создать доску</Trans>
          </Typography>
          <Container id="modal-modal-description" sx={{ mt: 2 }}>
            <form className="form form--board" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="form-title-input">
                <Trans i18nKey="createBoardModal.titleLabel">Заголовок доски</Trans>
              </label>
              <input
                id="form-title-input"
                className="form__input-text"
                {...register('title', { required: true })}
              />
              {errors.description && (
                <span className="form__error-text">
                  <Trans i18nKey="createBoardModal.titleInputError">
                    *Это поле обязательно для заполнения
                  </Trans>
                </span>
              )}

              <label htmlFor="form-description-input">
                <Trans i18nKey="createBoardModal.descriptionLabel">Описание</Trans>
              </label>

              <textarea
                id="form-description-input"
                className="form__textarea"
                rows={5}
                {...register('description')}
              />

              <Button
                variant="contained"
                className="form__btn save"
                data-testid="form-submit-btn"
                type="submit"
              >
                <Trans i18nKey="saveBtn">Сохранить</Trans>
              </Button>
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
