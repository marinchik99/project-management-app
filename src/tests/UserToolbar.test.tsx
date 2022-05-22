import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import UserToolbar from '../application/generalComponents/UserToolbar/UserToolbar';
import { store } from '../store';

describe('Header UserToolbar', () => {
  test('should render UserToolbar', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <UserToolbar />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByText(/войти/i)).toHaveLength(1);
  });
});
