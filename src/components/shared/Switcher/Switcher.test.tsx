import React from 'react';

import { render } from '@testing-library/react';

import Switcher from './Switcher';

describe('Switcher', () => {
  it('should render component correctly', () => {
    const props = {
      activeItem: 'Monthly',
      items: ['Monthly', 'Weekly'],
      onChangeHandler: jest.fn(),
    };
    const { asFragment } = render(
      <Switcher {...props} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
