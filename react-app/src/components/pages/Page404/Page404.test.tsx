import { render, cleanup } from '@testing-library/react';
import '../../../setupTests';
import pretty from 'pretty';

import React from 'react';
import Page404 from './Page404';

describe('404 component', () => {
  beforeEach(cleanup);

  test('should render 404', () => {
    const { container } = render(<Page404 />);
    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"page404\\">
        <h1>Error 404</h1>
        <p>Something seems to have gone wrong! The page you are requesting does not exist. It may be outdated, removed, or an invalid address was entered in the address bar.</p>
      </div>"
    `);
  });
});
