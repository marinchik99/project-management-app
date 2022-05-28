import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../store';
import TaskPreview from '../application/boardPage/TaskPreview';

const task = {
  id: '01234',
  boardId: '01234',
  columnId: '01234',
  userId: '01234',
  description: 'Some text',
  title: 'Some title',
}

describe('Header TaskPreview', () => {
  test('should render TaskPreview', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <TaskPreview {...task} />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByText(/Some title/i)).toHaveLength(1);
  });
});
