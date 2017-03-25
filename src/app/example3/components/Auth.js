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
            <li><Button onClick={this.login('beam', 'Admin')} text="Beam as Admin" /></li>
            <li><Button onClick={this.login('beam', 'Manager')} text="Beam as Manager" /></li>
            <li><Button onClick={this.login('beam', 'Developer')} text="Beam as Developer" /></li>
          </ul>
          <ul>
            <li><Button onClick={this.login('facebook', 'Admin')} text="Facebook as Admin" /></li>
            <li><Button onClick={this.login('facebook', 'Manager')} text="Facebook as Manager" /></li>
            <li><Button onClick={this.login('facebook', 'Developer')} text="Facebook as Developer" /></li>
          </ul>
          <ul>
            <li><Button onClick={this.login('github', 'Admin')} text="Github as Admin" /></li>
            <li><Button onClick={this.login('github', 'Manager')} text="Github as Manager" /></li>
            <li><Button onClick={this.login('github', 'Developer')} text="Github as Developer" /></li>
          </ul>
          <ul>
            <li><Button onClick={this.login('google', 'Admin')} text="Google as Admin" /></li>
            <li><Button onClick={this.login('google', 'Manager')} text="Google as Manager" /></li>
            <li><Button onClick={this.login('google', 'Developer')} text="Google as Developer" /></li>
          </ul>
          <ul>
            <li><Button onClick={this.login('reddit', 'Admin')} text="Reddit as Admin" /></li>
            <li><Button onClick={this.login('reddit', 'Manager')} text="Reddit as Manager" /></li>
            <li><Button onClick={this.login('reddit', 'Developer')} text="Reddit as Developer" /></li>
          </ul>
          <ul>
            <li><Button onClick={this.login('tumblr', 'Admin')} text="Tumblr as Admin" /></li>
            <li><Button onClick={this.login('tumblr', 'Manager')} text="Tumblr as Manager" /></li>
            <li><Button onClick={this.login('tumblr', 'Developer')} text="Tumblr as Developer" /></li>
          </ul>
          <ul>
            <li><Button onClick={this.login('twitter', 'Admin')} text="Twitter as Admin" /></li>
            <li><Button onClick={this.login('twitter', 'Manager')} text="Twitter as Manager" /></li>
            <li><Button onClick={this.login('twitter', 'Developer')} text="Twitter as Developer" /></li>
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
