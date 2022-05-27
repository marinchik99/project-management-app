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
import theme from '../../utils/themeSettings';

export default function TaskPreview() {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 400, mb: 2 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="secondary">
            Share
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
