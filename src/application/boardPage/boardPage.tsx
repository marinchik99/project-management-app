import { Container, Grid, Button } from '@mui/material';
import React, { useEffect } from 'react';
import '../../css/boardPage.css';
import AddIcon from '@mui/icons-material/Add';
import Preloader from '../generalComponents/preloader';
import { useAppDispatch, useAppSelector } from '../../store';
import { getColumns, setModalState } from '../../store/reducers/columnsReducer';
import { getBoardById } from '../../store/reducers/boardsReducer';
import ColumnList from './column';
import { ModalState } from '../../.d';
import ModalCreateColumn from '../generalComponents/ModalForm/modalCreateColumn';
import { useParams } from 'react-router-dom';

export default function BoardPage() {
  const { isLoading, currentBoard } = useAppSelector(({ boardsReducer }) => boardsReducer);
  const { columnList, modalColumn } = useAppSelector(({ columnsReducer }) => columnsReducer);
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getColumns(params.id));
    dispatch(getBoardById(params.id));
  }, []);

  const createColumn = () => {
    const modalState: ModalState = {
      isOpen: true,
      type: 'column',
    };

    dispatch(setModalState(modalState));
  };

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
            {columnList.map((column) => (
              <ColumnList key={column.id} {...column} />
            ))}
            <Button variant="outlined" className="button-add-column" onClick={createColumn}>
              <AddIcon fontSize="small" />
              Добавить колонку
            </Button>
          </div>
          {modalColumn.isOpen && modalColumn.type === 'column' && <ModalCreateColumn />}
        </Container>
      )}
    </section>
  );
}
