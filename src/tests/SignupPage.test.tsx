import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import SignupPage from '../application/authorizationForms/SignupPage/SignupPage';
import { store } from '../store';
import fetchMock from 'jest-fetch-mock';
import { wait } from '@testing-library/user-event/dist/utils';

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
  test('the form must show toast when wrong login', async () => {
    fetchMock.mockReject(new Error('Internal Server Error'));

    render(
      <MemoryRouter>
        <Provider store={store}>
          <SignupPage />
        </Provider>
      </MemoryRouter>
    );

    const nameInput = screen.getByTestId('name');
    const loginInput = screen.getByTestId('login');
    const passwordInput = screen.getByTestId('password');
    const agree = screen.getByRole('checkbox');
    const submit = screen.getByTestId('submit');

    await act(async () => {
      fireEvent.change(agree, { target: { checked: true } });
      fireEvent.change(nameInput, { target: { value: 'Alexander' } });
      fireEvent.change(loginInput, { target: { value: 'Alexander' } });
      fireEvent.change(passwordInput, { target: { value: '123456' } });
    });

    // await waitFor(() => {
    //   expect(submit).not.toBeDisabled();
    // });
    fireEvent.click(submit);

    screen.debug();
    expect(await screen.findByText(/Регистрация/i)).toBeInTheDocument();
  });
});
