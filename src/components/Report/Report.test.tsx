import React from 'react';
import { render } from '@testing-library/react';

import Report, {ReportProps, ReportType} from './Report';

jest.mock('../shared/charts/BarChart', () => ({
  __esModule: true,
  default: () => <div>Bar Chart</div>,
}));

jest.mock('../shared/charts/LineChart', () => ({
  __esModule: true,
  default: () => <div>Line Chart</div>,
}));

jest.mock('../shared/Table/Table', () => ({
  __esModule: true,
  default: () => <div>Table</div>,
}));

describe('Report', () => {
  it('should render title', () => {
    // Arrange
    const props = {title: 'The latest Invoices'} as ReportProps;

    // Act
    const {getByText} = render(<Report {...props}/>);

    // Assert
    expect(getByText(props.title)).toHaveClass('Report-title');
  });

  it.each([
    ['Bar Chart', ReportType.Bar],
    ['Line Chart', ReportType.Line],
    ['Table', ReportType.Table]
  ])(
    "should render %s if report type is %s",
    (text, type) => {
      // Arrange
      const props = {type} as ReportProps;

      // Act
      const {getByText} = render(<Report {...props}/>);

      // Assert
      expect(getByText(text)).toBeInTheDocument();
    }
  );
});
