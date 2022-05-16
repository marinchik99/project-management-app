import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../application/authorizationForms/LoginPage/LoginPage';
import { store } from '../store';

describe('Login page', () => {
  test('should render LoginPage', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Войти в аккаунт/i)).toBeInTheDocument();
  });
});
