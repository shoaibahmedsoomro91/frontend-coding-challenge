import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {createTheme, MuiThemeProvider} from '@material-ui/core/styles';
import APP_THEME_ENGINE from './assets/theme';

const getMuiTheme = createTheme({
  overrides: {
    ...APP_THEME_ENGINE
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={getMuiTheme}>
    <App style={{overflow: 'auto'}}/>
  </MuiThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls. Learn
// more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
