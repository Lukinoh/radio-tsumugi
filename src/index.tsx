import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {AppConfigService} from './services/AppConfigService';
import ConfigMissing from './components/ConfigMissing';

const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
};

const renderAppConfigError = (message: any) => {
  ReactDOM.render(
    <React.StrictMode>
      <ConfigMissing message={message} />
    </React.StrictMode>,
    document.getElementById('root')
  );
};

AppConfigService.fetch()
  .subscribe(renderApp, renderAppConfigError);