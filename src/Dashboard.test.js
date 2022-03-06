import { render, screen } from '@testing-library/react';
import Dashboard from './components/Dashboard';
import calculateHandler from './components/Dashboard';

describe('Dashboard', () => {
  test('renders Dashboard component', () => {
    render(<Dashboard />);
    //get DOM
    screen.debug();
  });
});

test('check if elements exist on the page', () => {
  render(<Dashboard />);
  //check if fields exist
  expect(screen.getByText('Property Price')).toBeInTheDocument();
  expect(screen.getByText('Down Payment')).toBeInTheDocument();
  expect(screen.getByText('Annual Interest Rate')).toBeInTheDocument();
  expect(screen.getByText('Amortization Period')).toBeInTheDocument();
  expect(screen.getByText('Payment Schedule')).toBeInTheDocument();
});
