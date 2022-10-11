import { render, cleanup, fireEvent } from '@testing-library/react';
import '../../../setupTests';
import pretty from 'pretty';

import React from 'react';
import Form from './Form';

describe('Form component', () => {
  beforeEach(cleanup);

  test('should disable sending button if it is not valid', () => {
    const component = render(<Form />);

    const btnSubmit = component.getByRole('submit-control');
    expect(btnSubmit).toBeDisabled();
  });

  test('should allow to send form if it is valid', () => {
    const component = render(<Form />);

    const textControl = component.getByRole('text-control');
    fireEvent.change(textControl, { target: { value: 'Zombie' } });

    const dateControl = component.getByRole('date-control');
    fireEvent.change(dateControl, { target: { value: '10/10/2022' } });

    const selectControl = component.getByRole('select-control');
    fireEvent.change(selectControl, { target: { value: 'dead' } });

    const horridControl = component.getByRole('horrid-control');
    fireEvent.change(horridControl, { target: { value: 'Horrid', checked: true } });

    const lovelyControl = component.getByRole('lovely-control');
    fireEvent.change(lovelyControl, { target: { value: 'Lovely', checked: true } });

    const unusualControl = component.getByRole('unusual-control');
    fireEvent.change(unusualControl, { target: { value: 'Unusual', checked: true } });

    const maleControl = component.getByRole('male-control');
    fireEvent.change(maleControl, { target: { value: 'Male', checked: true } });

    const fileControl = component.getByRole('file-control');
    const file = new File(['🧟‍♂️'], 'zombie.png', { type: 'image/png' });
    fireEvent.change(fileControl, { target: { files: file } });

    const btnSubmit = component.getByRole('submit-control');

    expect(btnSubmit).toBeEnabled();
  });
});
