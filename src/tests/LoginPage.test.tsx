import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../application/authorizationForms/LoginPage/LoginPage';
import { store } from '../store';
import fetchMock from 'jest-fetch-mock';

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

    const loginInput = screen.getByTestId('loginL');
    const passwordInput = screen.getByTestId('passwordL');

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

    const loginInput = screen.getByTestId('loginL');
    const passwordInput = screen.getByTestId('passwordL');
    const submit = screen.getByTestId('submitL');

    fireEvent.change(loginInput, { target: { value: 'Саша' } });
    fireEvent.change(passwordInput, { target: { value: '12' } });
    fireEvent.click(submit);

    expect(
      await screen.findByText(/Логин может содержать только латинские буквы/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Минимальная длина пароля 4 символа/i)).toBeInTheDocument();
  });

  test('the form must validate the input data on empty inputs', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </MemoryRouter>
    );

    const submit = screen.getByTestId('submitL');

    fireEvent.click(submit);

    expect(await screen.findAllByText(/Заполните поле/i)).toHaveLength(2);
  });

  test('the form must show toast when wrong login', async () => {
    fetchMock.mockReject(new Error('Login internal Error'));

    render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </MemoryRouter>
    );

    const loginInput = screen.getByTestId('loginL');
    const passwordInput = screen.getByTestId('passwordL');
    const submit = screen.getByTestId('submitL');

    await act(async () => {
      fireEvent.change(loginInput, { target: { value: 'Alexander1' } });
      fireEvent.change(passwordInput, { target: { value: '123456' } });
      fireEvent.click(submit);
    });

    expect(await screen.findByText(/Неверный логин или пароль!/i)).toBeInTheDocument();
  });
});
