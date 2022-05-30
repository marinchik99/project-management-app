import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import WelcomePage from '../application/welcomePage/welcomePage';

describe('welcomePage component', () => {
  it('class component debounce', async () => {
    render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('section-one')).toHaveStyle('opacity: 0');
    expect(screen.getByTestId('section-two')).toHaveStyle('opacity: 0');
    expect(screen.getByTestId('section-three')).toHaveStyle('opacity: 0');
    fireEvent.scroll(screen.getByTestId('section-one'));
    fireEvent.scroll(screen.getByTestId('section-two'));
    fireEvent.scroll(screen.getByTestId('section-three'));

    waitFor(() => {
      expect(screen.getByTestId('section-one')).toHaveStyle({
        y: 0,
        x: 0,
        opacity: 1,
        transition: { delay: 0.2 },
      });
      expect(screen.getByTestId('section-two')).toHaveStyle({
        y: 0,
        x: 0,
        opacity: 1,
        transition: { delay: 2 * 0.2 },
      });
      expect(screen.getByTestId('section-three')).toHaveStyle({
        y: 0,
        x: 0,
        opacity: 1,
        transition: { delay: 3 * 0.2 },
      });
    });
  });
});
