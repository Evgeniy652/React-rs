import React from 'react';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import './setupTests';

import App from './App';

jest.mock('./components/pages/home/home', () => () => {
  return 'home page';
});

describe('App component', () => {
  beforeEach(cleanup);

  test('should navigate to default page - Home', () => {
    const component = render(<App />);

    expect(component.getByText('home page')).toBeVisible();
  });

  test('should navigate to About page', async () => {
    const component = render(<App />);
    const user = userEvent.setup();
    await user.click(component.getByText('About'));

    expect(component.getByText(/The Rick and Morty API is a REST/i)).toBeVisible();
  });

  test('should navigate to 404 if unknown path', () => {
    window.history.pushState({}, 'Test page', 'bla-bla-bla');

    const component = render(<App />);
    expect(component.getByText('Error 404')).toBeVisible();
  });
});
