import React, { useState } from 'react';
import { useAppDispatch } from '../../store';
import { TRemoveConf } from '../../.d';
import { deleteBoardById } from '../../store/reducers/boardsReducer';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function RemoveConfirmation(props: TRemoveConf) {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = props;

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
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleRemove = () => {
    dispatch(deleteBoardById(id as string));
    setIsModalOpen(false);
  };

  return (
    <div className="modal-form">
      <Button onClick={handleOpen}>Удалить</Button>

      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Вы уверены, что хотите удалить эту доску?
          </Typography>
          <Button onClick={handleRemove}>Да</Button>
          <Button onClick={handleClose}>Отменить</Button>
        </Box>
      </Modal>
    </div>
  );
}
