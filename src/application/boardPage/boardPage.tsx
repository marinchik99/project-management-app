import { Container, Grid, Button, Stack, List, ListItem } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/boardPage.css';
import AddIcon from '@mui/icons-material/Add';

export default function BoardPage() {
  return (
    <section className="board-page">
      <Container maxWidth="xl" className="board-container">
        <Grid
          className="board-info"
          container
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={5}>
            <h2 className="board-name">Board Name</h2>
          </Grid>
          <Grid item xs={5} className="button-container">
            <NavLink to="/Boards" style={{ textDecoration: 'none' }}>
              <Button className="button-to-boards" variant="contained">
                На главную
              </Button>
            </NavLink>
          </Grid>
        </Grid>
        <div className="work-container">
          <div className="list-container">
            <span className="list-title" contentEditable={true}>
              Title
            </span>
            <div className="list">
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
              <div className="list__item">dfgh</div>
            </div>
            <form>
              <div></div>
              {/* <Button className="button-add-column" variant="contained">
                <AddIcon />
                Добавить список
              </Button> */}
            </form>
          </div>
          <div className="list-container">Item 2</div>
          <div className="list-container">Item 3</div>
          <div className="list-container">Item 4</div>
          <div className="list-container">Item 4</div>
          <div className="list-container">Item 4</div>
          <div className="list-container">Item 4</div>
        </div>
      </Container>
    </section>
  );
}
