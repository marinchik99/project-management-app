import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { injectStore } from '../../services/axiosInstance';

import BoardsPage from './MainRoute';

injectStore(store);

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
