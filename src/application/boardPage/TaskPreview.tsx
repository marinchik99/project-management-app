import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Divider,
  ThemeProvider,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Trans } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store';
import { deleteTask } from '../../store/reducers/tasksReducers';
import { selectUsers } from '../../store/reducers/usersReducer';
import { TaskType } from '../../types/types';
import theme from '../../utils/themeSettings';
import RemoveTaskConfirmation from '../generalComponents/RemoveConfirmation/RemoveTaskConfirmation';
import { stringAvatar } from '../generalComponents/UserToolbar/UserToolbar';

export default function TaskPreview(props: Partial<TaskType>) {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(selectUsers);
  const { id, boardId, columnId, userId } = props;
  // const { open, setOpen } = useState(false);

  const onClick = () => {
    // if (id && boardId && columnId) {
    //   dispatch(deleteTask({ id, boardId, columnId }));
    // }
  };

  const userName =
    users && users.length ? users.filter((user) => user.id === userId)[0].login : 'Anonymous';

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 345, mb: 2 }}>
        <CardActionArea>
          <CardContent sx={{ bgcolor: 'primary.light' }}>
            <Typography gutterBottom variant="h6" component="div" sx={{ mb: 0 }}>
              {props.title}
            </Typography>
            <Chip
              avatar={<Avatar {...stringAvatar(userName)}></Avatar>}
              label={userName}
              sx={{ mb: 1 }}
            />
            <Divider />
            <Typography
              variant="body2"
              color="text.secondary"
              paragraph={true}
              sx={{ WebkitLineClamp: 3, whiteSpace: 'normal', mt: 2, mb: 0 }}
            >
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="secondary" onClick={onClick}>
            <Trans i18nKey="deleteBtn">Удалить</Trans>
          </Button>
        </CardActions>
      </Card>
      <RemoveTaskConfirmation />
    </ThemeProvider>
  );
}
