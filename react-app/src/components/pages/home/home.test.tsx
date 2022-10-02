import { render, cleanup, fireEvent } from '@testing-library/react';
import '../../../setupTests';

import React from 'react';
import Home from './home';

jest.mock('./cards', () => () => {
  return 'named-awesome-component-mock';
});

describe('Home component', () => {
  beforeEach(cleanup);

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should enter value from localStorage to input', () => {
    const component = render(<Home />);
    const input = component.getByRole('input') as HTMLInputElement;

    expect(input.value).toBe('initValue');
  });

  test('should set value to localStorage', () => {
    const component = render(<Home />);
    const input = component.getByRole('input');
    fireEvent.change(input, { target: { value: 'Rick' } });
    component.unmount();

    expect(window.localStorage.setItem).toBeCalledWith('value', 'Rick');
  });
});
