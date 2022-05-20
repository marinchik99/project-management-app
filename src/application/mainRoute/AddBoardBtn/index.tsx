import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useAppDispatch, useAppSelector } from '../../../store';
import { setModalState } from '../../../store/reducers/boardsReducer';
import { ModalState } from '../../../.d';
import './AddBoardBtn.scss';

export default function AddBoardBtn() {
  const dispatch = useAppDispatch();

  const handleCreateBoard = () => {
    const modalState: ModalState = {
      isOpen: true,
      type: 'board',
    };

    dispatch(setModalState(modalState));
  };

  return (
    <Card className="add-board-card" sx={{ maxWidth: 350 }}>
      <CardActionArea onClick={handleCreateBoard} data-testid="addBoardBtn">
        <CardContent>
          <Typography gutterBottom variant="h5" component="h5">
            Добавить доску
          </Typography>
          <AddCircleOutlineIcon />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
