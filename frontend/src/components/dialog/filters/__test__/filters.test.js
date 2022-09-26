import { render, screen } from '@testing-library/react';
import FilterDialog from '../index';

describe("Test the Filter Dialog Component", () => {
	test('renders Filter dialog', () => {
		render(<FilterDialog open={true} title={'Filters'}/>);
		const dialog = screen.getByRole('dialog');
		expect(dialog).toBeInTheDocument();
	});
	
	test('renders Filter dialog with form fields', () => {
		render(<FilterDialog open={true} title={'Filters'}/>);
		const leaveTypeSelectBox = screen.getByTestId('leave-type');
		const startDate = screen.getByTestId('start-date');
		const endDate = screen.getByTestId('end-date');
		expect(leaveTypeSelectBox).toBeInTheDocument();
		expect(startDate).toBeInTheDocument();
		expect(endDate).toBeInTheDocument()    
	});
	
	test('renders Filter dialog with buttons', () => {
		render(<FilterDialog open={true} title={'Filters'}/>);
		const dialogHeaderList = screen.getAllByRole('action_buttons')
		expect(dialogHeaderList).toHaveLength(2);
	});
})
