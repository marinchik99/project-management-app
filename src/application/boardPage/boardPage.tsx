import { Container, Grid, Button } from '@mui/material';
import React, { useEffect } from 'react';
import '../../css/boardPage.css';
import AddIcon from '@mui/icons-material/Add';
import Preloader from '../generalComponents/preloader';
import { useAppDispatch, useAppSelector } from '../../store';
import { getBoardById } from '../../store/reducers/boardsReducer';

export default function BoardPage() {
  const { isLoading, currentBoard } = useAppSelector(({ boardsReducer }) => boardsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoardById(currentBoard.id));
  }, [currentBoard.id, dispatch]);

  // const addColumn = () => {
  //   const list = document.createElement('div');
  // };

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
              <h2 className="board-name">Board Name</h2>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
          <div className="work-container">
            <div className="list-container">
              <div className="list-block">
                <h3 className="list-title">Title</h3>
                <div className="list">
                  <div className="list__item">Карточка с содержимым</div>
                </div>
                <div className="add-card">
                  <AddIcon fontSize="small" />
                  Добавить карточку
                </div>
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
