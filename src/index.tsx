import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';

import './index.scss';
import reportWebVitals from './reportWebVitals';
import { routes } from './utils/constants';
import App from './App';
import Dashboard from './components/Dashboard';

ReactDOM.render(
  <React.StrictMode>
    <App>
      <Router>
        <Switch>
          <Route
            exact path="/"
            render={() => <Redirect to={routes.dashboard + '/invoices'} />}
          />
          <Route
            path={routes.dashboard}
            component={Dashboard}/>
          <Route component={() => <div>Page Not Found</div>} />
        </Switch>
      </Router>
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
