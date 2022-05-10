import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import '../css/boardsPage.css';

import Search from './mainRoute/search';
import AddBoardBtn from './mainRoute/addBoardBtn';

export default function BoardsPage() {
  const [boardList, setBoardsList] = useState([]);

  return (
    <div className="container boards-page">
      <h1>Boards</h1>
      <Search />
      <div className="boards-list-container">
        <Card sx={{ maxWidth: 350 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Delete
            </Button>
          </CardActions>
        </Card>
        <AddBoardBtn />
      </div>
    </div>
  );
}
