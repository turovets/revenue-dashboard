import React from 'react';
import { render } from '@testing-library/react';

import Table from './Table';

jest.mock('react-plotly.js', () => ({
  __esModule: true,
  default: () => null,
}));

describe('Table', () => {
  it('should render no data message if no data provided to the table', () => {
    // Arrange
    const props = { rows: [], columns: [], noDataMsg: 'No Data'};

    // Act
    const {getByText} = render(<Table {...props}/>);

    // Assert
    expect(getByText(props.noDataMsg)).not.toBeNull();
  });
  it('should render data in the table', () => {
    // Arrange
    const props = { rows: [{ name: 'Jon Blank' }], columns: [{ id: 'name', label: 'Name' },], noDataMsg: 'No Data'};

    // Act
    const { getByText, getByRole } = render(<Table {...props}/>);

    // Assert
    expect(getByText('Jon Blank')).not.toBeNull();
    expect(getByRole('columnheader')).toHaveTextContent('Name');
  });
});
