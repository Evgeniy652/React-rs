import { render, cleanup, fireEvent } from '@testing-library/react';
import '../../setupTests';
import data from '../../assets/data.json';

import React from 'react';
import Cards from './Cards';

describe('Cards component', () => {
  beforeEach(cleanup);

  test('should render 20 cards according to data', async () => {
    const component = render(<Cards dataArr={data.results} onCardClick={() => null} />);
    const cards = component.queryAllByRole('card');

    expect(cards.length).toBe(20);
  });

  test('should show empty message if no matches', async () => {
    const component = render(<Cards dataArr={[]} onCardClick={() => null} />);

    expect(component.queryAllByRole('card').length).toBe(0);
    expect(await component.findByText('No matches were found for your search')).toBeVisible();
  });

  test('should trigger onCardClick function', async () => {
    const mockFunc = jest.fn();

    const component = render(<Cards dataArr={data.results} onCardClick={mockFunc} />);
    const card = component.queryAllByRole('card')[0];
    fireEvent.click(card);

    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
});
