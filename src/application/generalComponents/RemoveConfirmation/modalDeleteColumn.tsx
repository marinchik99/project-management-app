import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { TRemoveConf } from '../../../.d';
import './RemoveConfirmation.scss';
import {
  getColumns,
  deleteColumnById,
  setModalDeleteState,
} from '../../../store/reducers/columnsReducer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ButtonGroup } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function DeleteColumnConfirmation(props: TRemoveConf) {
  const dispatch = useAppDispatch();
  const { currentBoard } = useAppSelector(({ boardsReducer }) => boardsReducer);
  const { modalDeleteColumn } = useAppSelector(({ columnsReducer }) => columnsReducer);
  const params = useParams();
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
    dispatch(deleteColumnById({ currentBoard, id }));
    dispatch(setModalDeleteState({ isOpen: false, type: null }));
    setTimeout(() => dispatch(getColumns(params.id)), 10);
  };

  return (
    <div id="modal-remove-confirm" className="modal modal-remove-confirm">
      <Modal
        open={modalDeleteColumn.isOpen}
        onClose={handleClose}
        className="modal-confirmation"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" gutterBottom sx={{ mt: 2 }}>
            Вы уверены, что хотите удалить колонку?
          </Typography>
          <ButtonGroup className="modal-delete-buttons">
            <Button className="remove-btn" variant="contained" onClick={handleRemove}>
              Да
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Нет
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
    </div>
  );
}
