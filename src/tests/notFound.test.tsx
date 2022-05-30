import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../application/notFound';

test('notFound component', () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/такая страница не найдена/i);
  expect(linkElement).toBeInTheDocument();
});
