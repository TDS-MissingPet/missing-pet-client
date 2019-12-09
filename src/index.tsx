import React from 'react';
import ReactDOM from 'react-dom';
import * as mobx from 'mobx';
import { Provider } from 'mobx-react';
import 'bootstrap/dist/css/bootstrap.min.css';

import stores from './stores';
import App from './App';

mobx.configure({ enforceActions: "observed" });

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);
