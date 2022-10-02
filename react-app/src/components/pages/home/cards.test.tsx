import { render, cleanup } from '@testing-library/react';
import '../../../setupTests';

import React from 'react';
import Cards from './cards';

describe('Cards component', () => {
  beforeEach(cleanup);
  test('should render 20 cards according to data', async () => {
    const component = render(<Cards value="" />);
    const cards = component.queryAllByRole('card');

    expect(cards.length).toBe(20);
  });

  test('should sort by "rick" name', () => {
    const component = render(<Cards value="" />);
    component.rerender(<Cards value="rick" />);
    const cards = component.queryAllByRole('card');

    expect(cards.length).toBe(4);
  });

  test('should show empty message if no matches', async () => {
    const component = render(<Cards value="" />);
    component.rerender(<Cards value="blablablabla" />);

    expect(component.queryAllByRole('card').length).toBe(0);
    expect(await component.findByText('No matches were found for your search')).toBeVisible();
  });
});
