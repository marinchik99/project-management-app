import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import ColumnList from '../application/boardPage/column';
import DeleteColumnConfirmation from '../application/generalComponents/RemoveConfirmation/modalDeleteColumn';

test('RemoveConfirmation delete column', async () => {
  render(
    <Provider store={store}>
      <ColumnList id={''} title={''} order={0} />
    </Provider>
  );

  const openModalBtn = screen.getByTestId('delete-column');
  expect(openModalBtn).toBeInTheDocument();

  userEvent.click(openModalBtn);

  expect(await screen.findByText('Вы уверены, что хотите удалить колонку?')).toBeInTheDocument();
  const cancelBtn = await screen.findByText('Нет');
  expect(cancelBtn).toBeInTheDocument();

  userEvent.click(cancelBtn);

  expect(
    await screen.queryByText('Вы уверены, что хотите удалить колонку?')
  ).not.toBeInTheDocument();
});
