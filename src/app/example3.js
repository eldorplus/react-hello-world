import React from 'react';
import { Router, Route, hashHistory, IndexRoute, Redirect } from 'react-router';
import Example3App from './example3/app';
import Home from './example3/components/Home';
import Auth from './example3/components/Auth';
import Users from './example3/components/Users';

const Example3 = () => {
  return (
    <div>
      <Router history={hashHistory}>
        <Route path="/" component={Example3App}>
          <IndexRoute component={Home} />
          <Route path="/auth/:direction" component={Auth} />
          <Route path="/users" component={Users} />
          <Redirect from="_=_" to="/" />
        </Route>
      </Router>
    </div>
  );
};

export default Example3;
