import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Example3App from './example3/app';
import Home from './example3/components/Home';
import Auth from './example3/components/Auth';
import Users from './example3/components/Users';
import User from './example3/components/User';

const Example3 = () => {
  return (
    <div>
      <Router history={hashHistory}>
        <Route path="/" component={Example3App}>
          <IndexRoute component={Home} />
          <Route path="/auth/:direction" component={Auth} />
          <Route path="/users" component={Users}>
            <Route path="/users/:userName" component={User} />
          </Route>
        </Route>
      </Router>
    </div>
  );
};

export default Example3;
