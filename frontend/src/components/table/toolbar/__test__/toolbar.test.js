import { fireEvent, render, screen } from '@testing-library/react';
import ToolBar from '../index';

test('renders toolbar with buttons', async () => {
  render(<ToolBar customToolBar={[{ actionType:'showDialog', actionOn:"filters" , id:"filters" , icon:"filter_list" , tooltip:"Filter Data"}]}/>);
  const toolbarButtons = await screen.findAllByRole('toolbar-buttons');  
  expect(toolbarButtons.length > 0)
});

test('filter button should open filter dialog', async () => {
  let bool = false;
  render(<ToolBar 
          onClick={(actionType , actionOn)=>{
            switch (actionType) {
              case 'showDialog':
                switch (actionOn) {
                  case 'filters':
                    bool = true;
                    break;
                  default:
                    break;
                }
                break;      
              default:
                break;
            }          
          }} 
        customToolBar={[{ actionType:'showDialog', actionOn:"filters" , id:"filters" , icon:"filter_list" , tooltip:"Filter Data"}]}
  />);
  const filter_button = screen.getByTitle('Filter Data');
  fireEvent.click(filter_button);
  expect(bool).toBe(true);
  
});


