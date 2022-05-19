import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import RemoveConfirmation from './RemoveConfirmation';

test('RemoveConfirmation component rendering', async () => {
  render(
    <Provider store={store}>
      <RemoveConfirmation id={''} />
    </Provider>
  );

  const openModalBtn = screen.getByText('Удалить');
  expect(openModalBtn).toBeInTheDocument();

  userEvent.click(openModalBtn);

  expect(await screen.findByText('Вы уверены, что хотите удалить эту доску?')).toBeInTheDocument();
  const cancelBtn = await screen.findByText('Нет');
  expect(cancelBtn).toBeInTheDocument();

  userEvent.click(cancelBtn);

  expect(
    await screen.queryByText('Вы уверены, что хотите удалить эту доску?')
  ).not.toBeInTheDocument();
});
