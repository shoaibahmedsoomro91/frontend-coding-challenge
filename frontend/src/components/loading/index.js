import React from 'react';
import Loading from '../svgIcons/loading';
import Grid from '@material-ui/core/Grid';
import {Dialog, DialogContent} from "@material-ui/core";
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import APP_THEME_ENGINE from '../../assets/theme';

const getMuiTheme = createTheme({
  overrides: {
    ...APP_THEME_ENGINE,
    MuiDialog: {
      root: {
        "-moz-user-select": "-moz-none",
        "-khtml-user-select": "none",
        "-webkit-user-select": "none",
        "-ms-user-select": "none",
        "user-select": "read-write"
      },
      paper: {
        background: 'transparent'
      }
    }
  }
})
export default function ThemeCircularProgress() {
  return (
    <ThemeProvider theme={getMuiTheme}>
      <Dialog
        open={true}        
        PaperProps={{
          elevation: 0
        }}
        >
        <DialogContent>
          <Grid container direction="row">
            <Grid item xs={12}>
              <Loading id="Loading"/>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}