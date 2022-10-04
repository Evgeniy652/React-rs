import { render, cleanup, fireEvent } from '@testing-library/react';
import '../../../setupTests';

import React from 'react';
import Home from './Home';
import pretty from 'pretty';

jest.mock('../../Cards/Cards', () => () => {
  return 'named-awesome-component-mock';
});

describe('Home component', () => {
  beforeEach(cleanup);

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should enter value to input from localStorage', () => {
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

  test('should render home', () => {
    const { container } = render(<Home />);
    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"content\\">
        <div class=\\"search-block\\"><input role=\\"input\\" type=\\"search\\" id=\\"input__search\\" name=\\"search\\" autocomplete=\\"off\\" placeholder=\\"Search by name\\" value=\\"\\"></div>named-awesome-component-mock
      </div>"
    `);
  });
});
