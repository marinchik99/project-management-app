import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useAppDispatch, useAppSelector } from '../../store';

export default function AddBoardBtn() {
  const dispatch = useAppDispatch();
  const { isLoading, boardList } = useAppSelector(({ boardsReducer }) => boardsReducer);
  

  const handleCreateBoard = () => {

  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => console.log('action')}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Add Board
          </Typography>
          <AddCircleOutlineIcon />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
