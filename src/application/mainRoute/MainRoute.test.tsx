import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import BoardsPage from './MainRoute';

describe('Boards page', () => {
  it('mainContent', () => {
    render(
      <Provider store={store}>
        <BoardsPage />
      </Provider>
    );

    expect(screen.getByText('Доски')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Поиск')).toBeInTheDocument();
  });
});
