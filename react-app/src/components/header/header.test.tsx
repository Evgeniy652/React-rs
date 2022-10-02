import { render, cleanup } from '@testing-library/react';
import '../../setupTests';
import pretty from 'pretty';

import React from 'react';
import Header from './header';
import { MemoryRouter } from 'react-router-dom';

describe('Header component', () => {
  beforeEach(cleanup);

  test('should render header', () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<header>
        <h1>The Rick and Morty</h1>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </header>"
    `);
  });
});
