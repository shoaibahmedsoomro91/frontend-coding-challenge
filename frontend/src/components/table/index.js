import React from 'react';
import MUIDataTable from "mui-datatables";
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';


function DataTable ({ title, gridData, gridcolumns, gridOptions }) {
  const myTheme = createTheme({
    overrides: {
      MUIDataTableToolbar: {
        root : {
          backgroundColor: '#ff9419d9'
        },
        titleText : {
          color : '#fff'
        },
        icon : {
          color : '#fff',
          '&:hover': {
            color: '#fff'
          }
        },
        iconActive : {
          color : '#000'
        }
      },
      MUIDataTableHeadCell : {
        data : {
          fontSize : 14,
          fontWeight : 'bold'
        }
      }
    },
  });
  return <MuiThemeProvider theme={myTheme}>
    <MUIDataTable      
      title={title}
      data={gridData}
      columns={gridcolumns}
      options={gridOptions}
    />
  </MuiThemeProvider>;
}

export default DataTable;