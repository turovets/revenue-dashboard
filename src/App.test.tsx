import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders children', () => {
  render(<App>Inner Component</App>);
  const productsTitle = screen.getByText(/Inner Component/i);
  expect(productsTitle).toBeInTheDocument();
});
