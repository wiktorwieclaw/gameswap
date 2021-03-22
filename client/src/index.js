import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MuiThemeProvider} from "@material-ui/core";
import theme from "./theme"

//import 'fontsource-roboto';
//import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
//import ThreeDRotation from '@material-ui/icons/ThreeDRotation';

ReactDOM.render(
  <React.StrictMode>
      <MuiThemeProvider theme={theme}>
          <App/>
      </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
