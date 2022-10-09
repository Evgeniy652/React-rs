import { render, cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import '../../../setupTests';
import { setItemToLocalStorage } from '../../../setupTests';
import Home from './Home';

jest.mock('../../Cards/Cards', () => () => {
  return 'named-awesome-component-mock';
});

describe('Home component', () => {
  beforeEach(cleanup);

  test('should set empty value if localStorage empty', () => {
    setItemToLocalStorage(undefined);

    const component = render(<Home />);
    const input = component.getByRole('input') as HTMLInputElement;

    expect(input.value).toBe('');
  });

  test('should enter value to input from localStorage', () => {
    setItemToLocalStorage('hello');

    const component = render(<Home />);
    const input = component.getByRole('input') as HTMLInputElement;

    expect(input.value).toBe('hello');
  });

  test('should set value to localStorage', () => {
    const component = render(<Home />);
    const input = component.getByRole('input');
    fireEvent.change(input, { target: { value: 'Rick' } });
    component.unmount();

    expect(window.localStorage.setItem).toBeCalledWith('value', 'Rick');
  });
});
