import { render, screen } from '@testing-library/react';
import AppLayout from '../AppLayout';

describe("Test the Applayout Component", () => {
  test('renders with appbar', () => {
    render(<AppLayout />);
    const appBar = screen.getByRole('app-bar');
    expect(appBar).toBeInTheDocument();
  });
  
  test('renders with app container', () => {
    render(<AppLayout />);
    const container = screen.getByRole('app-container');
    expect(container).toBeInTheDocument();
  });  
})