import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function AddBoardBtn() {
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
