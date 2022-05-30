import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import reducer, { ColumnsState, setModalState } from '../store/reducers/columnsReducer';

const initial: ColumnsState = {
  columnList: [],
  currentColumn: {
    id: '',
    title: '',
    order: 0,
  },
  isLoading: false,
  isRender: false,
  modalColumn: {
    isOpen: false,
    type: null,
  },
  modalDeleteColumn: {
    isOpen: false,
    type: null,
  },
};

describe('Column Reducer tests', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {
        type: undefined,
      })
    ).toEqual(initial);
  });
  it('check modal state shanging', () => {
    const previousState = initial;

    expect(
      reducer(
        previousState,
        setModalState({
          isOpen: true,
          type: 'column',
        })
      )
    ).toEqual({
      columnList: [],
      currentColumn: {
        id: '',
        title: '',
        order: 0,
      },
      isLoading: false,
      isRender: false,
      modalColumn: {
        isOpen: true,
        type: 'column',
      },
      modalDeleteColumn: {
        isOpen: false,
        type: null,
      },
    });
  });
});
