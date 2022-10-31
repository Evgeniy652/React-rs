import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { fetchTasks_some_cards_response } from '__mocks__/server/handlers';
import { mswServer } from '__mocks__/server/setup-server';

import { setItemToLocalStorage } from '../../../setupTests';
import Home from './Home';

jest.mock('../../Cards/Cards', () => () => {
  return 'named-awesome-component-mock';
});

describe('Home component', () => {
  beforeEach(cleanup);

  test('should set empty value if localStorage empty', async () => {
    mswServer.use(fetchTasks_some_cards_response);
    setItemToLocalStorage(undefined);

    const component = render(<Home />);

    await waitFor(() => {
      const input = component.getByRole('input') as HTMLInputElement;
      expect(input.value).toBe('');
    });
  });

  test('should enter value to input from localStorage', async () => {
    mswServer.use(fetchTasks_some_cards_response);
    setItemToLocalStorage('hello');

    const component = render(<Home />);

    await waitFor(() => {
      const input = component.getByRole('input') as HTMLInputElement;
      expect(input.value).toBe('hello');
    });
  });

  test('should set value to localStorage', async () => {
    setItemToLocalStorage('');
    mswServer.use(fetchTasks_some_cards_response);
    const component = render(<Home />);

    await waitFor(() => {
      const input = component.getByRole('input');
      fireEvent.change(input, { target: { value: 'Rick' } });
      component.unmount();

      expect(window.localStorage.setItem).toBeCalledWith('value', 'Rick');
    });
  });
});
