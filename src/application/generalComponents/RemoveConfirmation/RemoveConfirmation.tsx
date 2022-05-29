import React, { useState } from 'react';
import { Trans } from 'react-i18next';
import { useAppDispatch } from '../../../store';
import { TRemoveConf } from '../../../.d';
import { deleteBoardById, getBoards } from '../../../store/reducers/boardsReducer';
import './RemoveConfirmation.scss';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ButtonGroup } from '@mui/material';

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
    setTimeout(() => dispatch(getBoards()), 10);
  };

  return (
    <div id="modal-remove-confirm" className="modal modal-remove-confirm">
      <Button className="remove-btn" variant="outlined" onClick={handleOpen}>
        <Trans i18nKey="deleteBtn">Удалить</Trans>
      </Button>

      <Modal
        open={isModalOpen}
        onClose={handleClose}
        className="modal-confirmation"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" gutterBottom sx={{ mt: 2 }}>
            <Trans i18nKey="removeConfirmModal.boardText">
              Вы уверены, что хотите удалить эту доску?
            </Trans>
          </Typography>
          <ButtonGroup>
            <Button className="remove-btn" variant="contained" onClick={handleRemove}>
              <Trans i18nKey="yesBtn">Да</Trans>
            </Button>
            <Button variant="contained" onClick={handleClose}>
              <Trans i18nKey="noBtn">Нет</Trans>
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
    </div>
  );
}
