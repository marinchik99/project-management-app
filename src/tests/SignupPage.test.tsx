import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import SignupPage from '../application/authorizationForms/SignupPage/SignupPage';
import { store } from '../store';
import fetchMock from 'jest-fetch-mock';
import { userApi } from '../store/services/usersApi';
// import '../services/i18n';

beforeEach((): void => {
  fetchMock.resetMocks();
});

afterEach(() => {
  store.dispatch(userApi.util.resetApiState());
});

describe('Signup page', () => {
  test('should render Signup', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SignupPage />
        </Provider>
      </MemoryRouter>
    );

    screen.debug();
    expect(screen.getByText(/Регистрация/i)).toBeInTheDocument();
    expect(screen.getByText(/согласен/i)).toBeInTheDocument();

    expect(screen.getAllByText(/Введите имя/i)).toHaveLength(2);
    expect(screen.getAllByText(/логин/i)).toHaveLength(2);
    expect(screen.getAllByText(/пароль/i)).toHaveLength(2);
  });

  test('the form must validate the input data on empty inputs', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SignupPage />
        </Provider>
      </MemoryRouter>
    );

    const submit = screen.getByTestId('submitS');
    const agree = screen.getByRole('checkbox');

    await act(async () => {
      fireEvent.click(agree);
      fireEvent.click(submit);
    });

    expect(await screen.findAllByText(/Заполните поле/i)).toHaveLength(3);
  });

  test('the form must show toast when wrong registraion', async () => {
    fetchMock.mockRejectOnce(new Error('Signup Error'));

    render(
      <MemoryRouter>
        <Provider store={store}>
          <SignupPage />
        </Provider>
      </MemoryRouter>
    );

    const nameInput = screen.getByTestId('name');
    const loginInput = screen.getByTestId('loginS');
    const passwordInput = screen.getByTestId('passwordS');
    const agree = screen.getByRole('checkbox');
    const submit = screen.getByTestId('submitS');

    await act(async () => {
      fireEvent.click(agree);
      fireEvent.change(nameInput, { target: { value: 'Alexanderr' } });
      fireEvent.change(loginInput, { target: { value: 'Alexander666' } });
      fireEvent.change(passwordInput, { target: { value: '123456' } });
      fireEvent.click(submit);
    });

    expect(await screen.findByText(/Аккаунт с таким логином существует./i)).toBeInTheDocument();
  });
});
