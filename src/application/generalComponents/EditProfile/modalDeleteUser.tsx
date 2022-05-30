import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import '../RemoveConfirmation/RemoveConfirmation.scss';
import { deleteUserById, setModalDeleteState } from '../../../store/reducers/usersReducer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ButtonGroup } from '@mui/material';
import { TRemoveConf } from '../../../.d';
import { logout } from '../../../store/reducers/authSlice';
import { Trans } from 'react-i18next';

export default function DeleteUserConfirmation(props: TRemoveConf) {
  const dispatch = useAppDispatch();
  const { modalDeleteUser } = useAppSelector(({ usersReducer }) => usersReducer);
  const { id } = props;

  const style = {
    position: 'absolute',
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

  const handleClose = () => {
    dispatch(setModalDeleteState({ isOpen: false, type: null }));
  };

  const handleRemove = () => {
    dispatch(deleteUserById(id));
    setTimeout(() => dispatch(logout()), 300);
    dispatch(setModalDeleteState({ isOpen: false, type: null }));
  };

  return (
    <div id="modal-remove-confirm" className="modal modal-remove-confirm">
      <Modal
        open={modalDeleteUser.isOpen}
        onClose={handleClose}
        className="modal-confirmation"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" gutterBottom sx={{ mt: 2 }}>
            <Trans i18nKey="removeConfirmModal.userText">
              Вы уверены, что хотите удалить полользователя?
            </Trans>
          </Typography>
          <ButtonGroup className="modal-delete-buttons">
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
