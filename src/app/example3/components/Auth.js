require('es6-promise').polyfill();
require('isomorphic-fetch');

import React from 'react';
import Button from './../../components/Button';

class Auth extends React.Component {
  constructor(props) {
    super(props);
  }

  login(provider, role) {
    return () => {
      window.location = `/auth/${provider}?role=${role}&success=/&failure=/`;
    }
  }
  logout() {
    window.location = `/auth/logout?success=/`
  }
  render() {
    return (
      <div>
        <div>
          <h2>Login with</h2>
          <ul>
            <li><Button onClick={this.login('google', 'admin')} text="Google as Admin" /></li>
            <li><Button onClick={this.login('google', 'manager')} text="Google as Manager" /></li>
            <li><Button onClick={this.login('google', 'developer')} text="Google as Developer" /></li>
          </ul>
        </div>
        <div>
          <ul>
            <li><Button onClick={this.logout} text="Logout" /></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Auth;
