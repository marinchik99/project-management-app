import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  ThemeProvider,
  Typography,
} from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { deleteTask } from '../../store/reducers/tasksReducers';
import { selectUsers } from '../../store/reducers/usersReducer';
import { TaskType } from '../../types/types';
import theme from '../../utils/themeSettings';

export default function TaskPreview(props: Partial<TaskType>) {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(selectUsers);
  const { id, boardId, columnId } = props;

  const onClick = () => {
    dispatch(deleteTask({ id, boardId, columnId }));
  };

  const userName =
    users && users.length ? users.filter((user) => user.id === props.userId)[0].name : '';

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 345, mb: 2 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.title}
            </Typography>
            <Typography variant="subtitle2">{userName}</Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              paragraph={true}
              sx={{ WebkitLineClamp: 3, whiteSpace: 'normal' }}
            >
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="secondary" onClick={onClick}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
