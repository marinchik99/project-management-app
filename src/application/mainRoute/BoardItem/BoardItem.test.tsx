import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import BoardItem from '.';
import { Board } from '../../../.d';
import { MemoryRouter } from 'react-router-dom';

test('BoardItem component rendering', () => {
  const fakeData: Board = {
    id: 'id',
    title: 'Test Title',
    description: 'Test Description',
  };

  render(
    <MemoryRouter>
      <Provider store={store}>
        <BoardItem {...fakeData} />
      </Provider>
    </MemoryRouter>
  );

  expect(screen.getByText('Test Title')).toBeInTheDocument();
  expect(screen.getByText('Test Description')).toBeInTheDocument();
});
