import React from 'react';
import { Link } from 'react-router-dom';

import { Board } from '../../../.d';
import RemoveConfirmation from '../../generalComponents/RemoveConfirmation';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function BoardItem(props: Board) {
  const { id, title, description } = props;

  return (
    <Card sx={{ maxWidth: 350 }}>
      <Link to={`boards/${id}`}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <RemoveConfirmation id={id} />
      </CardActions>
    </Card>
  );
}
