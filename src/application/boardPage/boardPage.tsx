import { Container, Grid, Button, ButtonGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import '../../css/boardPage.css';
import AddIcon from '@mui/icons-material/Add';
import Preloader from '../generalComponents/preloader';
import { useAppDispatch, useAppSelector } from '../../store';
import { getBoardById } from '../../store/reducers/boardsReducer';
import CloseIcon from '@mui/icons-material/Close';

export default function BoardPage() {
  const { isLoading, currentBoard } = useAppSelector(({ boardsReducer }) => boardsReducer);
  const dispatch = useAppDispatch();
  const [changeTitle, setTitle] = useState(false);

  useEffect(() => {
    dispatch(getBoardById(currentBoard.id));
  }, [currentBoard.id, dispatch]);

  return (
    <section className="board-page">
      {isLoading ? (
        <Preloader />
      ) : (
        <Container maxWidth="xl" className="board-container">
          <Grid
            className="board-info"
            container
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={6}>
              <h2 className="board-name">{currentBoard.title}</h2>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
          <div className="work-container">
            <div className="list-container">
              <div className="list-block">
                <div className="title-container">
                  <div className="list-title">
                    {!changeTitle ? (
                      <h3 onClick={() => setTitle(true)}> Title </h3>
                    ) : (
                      <div className="list-input-container">
                        <input className="list-input" type="text" />
                        <ButtonGroup
                          className="list-input-buttons"
                          variant="outlined"
                          size="small"
                          aria-label="small button group"
                        >
                          <Button onClick={() => setTitle(false)}>Submit</Button>
                          <Button onClick={() => setTitle(false)}>Cansel</Button>
                        </ButtonGroup>
                      </div>
                    )}
                  </div>
                  <CloseIcon className="list-close" />
                </div>
                <div className="list">
                  <div className="list__item">Карточка с содержимым</div>
                </div>
                <Button className="add-card">
                  <AddIcon fontSize="small" />
                  Добавить карточку
                </Button>
              </div>
            </div>
            <Button variant="outlined" className="button-add-column">
              <AddIcon fontSize="small" />
              Добавить колонку
            </Button>
          </div>
        </Container>
      )}
    </section>
  );
}
