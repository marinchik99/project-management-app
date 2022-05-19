import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import AddBoardBtn from '.';
import ModalForm from '../../generalComponents/ModalForm';

describe('Add new board', () => {
  it('AddBoardBtn component rendering', () => {
    render(
      <Provider store={store}>
        <AddBoardBtn />
      </Provider>
    );

    expect(screen.getByText('Добавить доску')).toBeInTheDocument();
  });

  it('AddBoardBtn click and ModalForm opening', async () => {
    render(
      <Provider store={store}>
        <AddBoardBtn />
      </Provider>
    );

    const addBoardBtn = screen.getByTestId('addBoardBtn');
    expect(addBoardBtn).toBeInTheDocument();

    userEvent.click(addBoardBtn);

    render(
      <Provider store={store}>
        <ModalForm />
      </Provider>
    );

    expect(await screen.findByText('Создать доску')).toBeInTheDocument();
    expect(await screen.findByText('Заголовок доски')).toBeInTheDocument();
    expect(await screen.findByText('Описание')).toBeInTheDocument();

    const titleInput = (await screen.findByLabelText('Заголовок доски')) as HTMLInputElement;
    expect(titleInput).toBeInTheDocument();

    userEvent.type(titleInput, 'test title');
    expect(titleInput.value).toBe('test title');

    const submitBtn = await screen.findByTestId('form-submit-btn');
    const closeBtn = await screen.findByTestId('form-close-btn');
    expect(submitBtn).toBeInTheDocument();
    expect(closeBtn).toBeInTheDocument();

    userEvent.click(closeBtn);
  });
});
