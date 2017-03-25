import React from 'react';
import Button from './../../components/Button';
import NavLink from './NavLink';

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
    window.location = `/auth/logout?success=/&failure=/`
  }
  render() {
    return (
      <div>
        <div><NavLink to="/users">All Users</NavLink></div>
        <div>
          <h2>Login with</h2>

          <ul>
            <li><Button onClick={this.login('google', 'Admin')} text="Google as Admin" /></li>
            <li><Button onClick={this.login('google', 'Manager')} text="Google as Manager" /></li>
            <li><Button onClick={this.login('google', 'Developer')} text="Google as Developer" /></li>
          </ul>
          <ul>
            <li><Button onClick={this.login('github', 'Admin')} text="Github as Admin" /></li>
            <li><Button onClick={this.login('github', 'Manager')} text="Github as Manager" /></li>
            <li><Button onClick={this.login('github', 'Developer')} text="Github as Developer" /></li>
          </ul>
          <ul>
            <li><Button onClick={this.login('facebook', 'Admin')} text="Facebook as Admin" /></li>
            <li><Button onClick={this.login('facebook', 'Manager')} text="Facebook as Manager" /></li>
            <li><Button onClick={this.login('facebook', 'Developer')} text="Facebook as Developer" /></li>
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
