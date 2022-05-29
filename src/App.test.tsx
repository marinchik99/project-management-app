import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { store } from './store';

test('renders learn react link', () => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/Войти/i);
  expect(linkElement).toBeInTheDocument();
});
