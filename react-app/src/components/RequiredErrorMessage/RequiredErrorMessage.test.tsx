import { render, cleanup } from '@testing-library/react';
import '../../setupTests';

import React from 'react';
import RequiredErrorMessage from './RequiredErrorMessage';

describe('RequiredErrorMessage', () => {
  beforeEach(cleanup);

  test('should show error message', () => {
    const component = render(<RequiredErrorMessage isError={true}/>);

	expect(component.queryByText('This field is required')).toBeVisible();
  });

  test('should not show error message', () => {
    const component = render(<RequiredErrorMessage isError={false}/>);

	expect(component.queryByText('This field is required')).toBe(null);
  });
});
