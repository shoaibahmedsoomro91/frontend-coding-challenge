import { render, screen } from '@testing-library/react';
import DataTable from '../index';

describe("Test the DataTable Component", () => {
  test('renders datatbale with tootlebar', async () => {
    render(<DataTable />);
    const toolbar = screen.getByRole('toolbar');
    const toolbarHeading = toolbar.querySelector('h6');
    expect(toolbar).toBeInTheDocument();
    expect(toolbarHeading).toBeInTheDocument();
  });
  
  test('renders datatbale with table', async () => {
    render(<DataTable />);
    const grid = screen.getByRole('grid');
    expect(grid).toBeInTheDocument();
  });  
})