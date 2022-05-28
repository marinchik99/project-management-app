import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../store';
import ModalCreateTask from '../application/generalComponents/ModalCreateTask/ModalCreateTask';

describe('Header ModalCreateTask', () => {
  test('should render ModalCreateTask', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ModalCreateTask
            open={true}
            handleClose={function (): void {
              throw new Error('Function not implemented.');
            }}
            boardId={'01234'}
            columnId={'01234'}
          />
        </Provider>
      </MemoryRouter>
    );
    screen.debug();
    expect(screen.getAllByText(/Создание задачи/i)).toHaveLength(1);
  });

  test('should not render ModalCreateTask when open prop false', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ModalCreateTask
            open={false}
            handleClose={function (): void {
              throw new Error('Function not implemented.');
            }}
            boardId={'01234'}
            columnId={'01234'}
          />
        </Provider>
      </MemoryRouter>
    );
    screen.debug();
    expect(screen.queryByText(/Создание задачи/i)).not.toBeInTheDocument();
  });
});
