import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import BoardPage from '../application/boardPage/boardPage';
import ModalCreateColumn from '../application/generalComponents/ModalForm/modalCreateColumn';
import { Column } from '../store/reducers/columnsReducer';
import ColumnList from '../application/boardPage/column';
import BoardItem from '../application/mainRoute/BoardItem';
import { Board } from '../.d';
import { MemoryRouter } from 'react-router-dom';

describe('Add new column', () => {
  test('Column component rendering', () => {
    const fakeData: Column = {
      id: 'id',
      title: 'Test Title',
      order: 0,
    };

    render(
      <Provider store={store}>
        <ColumnList {...fakeData} />
      </Provider>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  // it('BoardPage component rendering', async () => {
  //   const fake: Board = {
  //     id: 'id',
  //     title: 'Test Title',
  //     description: 'Test',
  //   };

  //   render(
  //     <MemoryRouter>
  //       <Provider store={store}>
  //         <BoardItem {...fake} />
  //       </Provider>
  //     </MemoryRouter>
  //   );

  //   const boardCard = screen.getByTestId('board-card');
  //   expect(boardCard).toBeInTheDocument();

  //   userEvent.click(boardCard);

  //   render(
  //     <Provider store={store}>
  //       <BoardPage />
  //     </Provider>
  //   );

  //   expect(await screen.findByText(`${fake.title}`)).toBeInTheDocument();
  //   expect(await screen.findByText('Добавить колонку')).toBeInTheDocument();
  // });
});
