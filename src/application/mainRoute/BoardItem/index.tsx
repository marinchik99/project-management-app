import React from 'react';
import { Link } from 'react-router-dom';

import { Board } from '../../../.d';
import RemoveConfirmation from '../../generalComponents/RemoveConfirmation/RemoveConfirmation';
import './BoardItem.scss';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';

export default function BoardItem(props: Board) {
  const { id, title, description } = props;

  return (
    <Card className="board-card" sx={{ maxWidth: 350 }}>
      <Link to={`boards/${id}`}>
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h5"
              color="text.primary"
              className="board-card__title"
            >
              {title}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions className="board-card__remove-btn">
        <RemoveConfirmation id={id} />
      </CardActions>
    </Card>
  );
}
