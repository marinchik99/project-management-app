import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useAppDispatch, useAppSelector } from '../../../store';
import { setModalState } from '../../../store/reducers/boardsReducer';
import { ModalState } from '../../../.d';

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
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleCreateBoard}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Добавить доску
          </Typography>
          <AddCircleOutlineIcon />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
