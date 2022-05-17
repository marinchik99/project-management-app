import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import reducer, { BoardsState, setModalState } from '../store/reducers/boardsReducer';

const initialState: BoardsState = {
  boardList: [],
  currentBoard: null,
  search: '',
  isLoading: false,
  modal: {
    isOpen: false,
    type: null,
  },
};

describe('Board Reducer tests', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {
        type: undefined,
      })
    ).toEqual(initialState);
  });
  it('check modal state shanging', () => {
    const previousState = initialState;

    expect(
      reducer(
        previousState,
        setModalState({
          isOpen: true,
          type: 'board',
        })
      )
    ).toEqual({
      boardList: [],
      currentBoard: null,
      search: '',
      isLoading: false,
      modal: {
        isOpen: true,
        type: 'board',
      },
    });
  });
});
