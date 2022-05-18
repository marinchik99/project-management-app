import { fireEvent, render, screen } from '@testing-library/react';
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
  test('should render form inputs', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </MemoryRouter>
    );

    const loginInput = screen.getByTestId('login');
    const passwordInput = screen.getByTestId('password');

    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
  test('the form must validate the input data', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </MemoryRouter>
    );

    screen.debug();

    const loginInput = screen.getByTestId('login');
    const passwordInput = screen.getByTestId('password');
    const submit = screen.getByTestId('submit');

    fireEvent.change(loginInput, { target: { value: 'Саша' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submit);

    expect(await screen.findByText(/Must be only english letters!/i)).toBeInTheDocument();
    screen.debug();
    expect(passwordInput).toBeInTheDocument();
  });
});
