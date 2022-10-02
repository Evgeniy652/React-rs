import { render, cleanup } from '@testing-library/react';
import '../../setupTests';
import pretty from 'pretty';

import React from 'react';
import Footer from './footer';

describe('Footer component', () => {
  beforeEach(cleanup);

  test('should render footer', () => {
    const { container } = render(<Footer />);
    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<footer>
        <p>React</p>
        <div><img src="[object Object]" alt="logo"></div>
        <p>© 2022</p>
      </footer>"
    `);
  });
});
