import React, { useState } from 'react';
import { useAppDispatch } from '../../store';
import { SubmitHandler, useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { BoardBody } from '../../.d';
import { createBoard } from '../../store/reducers/boardsReducer';

type Inputs = {
  title: string;
  description: string;
};

export default function ModalForm() {
  const dispatch = useAppDispatch();
  // const { isLoading, boardList } = useAppSelector(({ boardsReducer }) => boardsReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: BoardBody) => {
    dispatch(createBoard(data));
    console.log(data);
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
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
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Создать доску
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form className="form form--board" onSubmit={handleSubmit(onSubmit)}>
              <label>Заголовок доски</label>
              <input {...(register('title'), { required: true })} />
              {errors.description && <span>Это поле обязательно для заполнения</span>}

              <label>Описание</label>
              <input {...register('description')} />

              <input type="submit" />
              <button onClick={handleClose}>Закрыть</button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
