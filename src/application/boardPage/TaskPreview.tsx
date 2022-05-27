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
import { TaskType } from '../../types/types';
import theme from '../../utils/themeSettings';

export default function TaskPreview(props: Partial<TaskType>) {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 345, mb: 2 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.title}
            </Typography>
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
          <Button size="small" color="secondary">
            Delete
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
