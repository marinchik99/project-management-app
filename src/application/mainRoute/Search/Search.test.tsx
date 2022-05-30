import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Search from '.';

test('Search component rendering', () => {
  render(<Search />);

  const searchInput = screen.getByPlaceholderText(/Поиск/i) as HTMLInputElement;
  const searchBtn = screen.getByRole('button');

  expect(searchInput).toBeInTheDocument();
  expect(searchBtn).toHaveTextContent('Поиск');

  userEvent.type(searchInput, 'test value');
  userEvent.click(searchBtn);
});
