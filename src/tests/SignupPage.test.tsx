import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import SignupPage from '../application/authorizationForms/SignupPage/SignupPage';
import { store } from '../store';

describe('Signup page', () => {
  test('should render Signup', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SignupPage />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Регистрация/i)).toBeInTheDocument();
    expect(screen.getByText(/согласен/i)).toBeInTheDocument();

    expect(screen.getAllByText(/Введите имя/i)).toHaveLength(2);
    expect(screen.getAllByText(/логин/i)).toHaveLength(2);
    expect(screen.getAllByText(/пароль/i)).toHaveLength(2);
  });
});
