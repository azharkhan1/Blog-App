import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import AppRouter from './app/routes';
import CssBaseline from "@material-ui/core/CssBaseline";

ReactDOM.render(
  <React.StrictMode>
    <AppRouter>
      <App />
    </AppRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


