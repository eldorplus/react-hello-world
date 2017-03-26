import React from 'react';
import axios from 'axios';
import t from 'tcomb-form'
import cookie from 'react-cookie';
import Button from './../../components/Button';
import NavLink from './NavLink';

const RolesEnum = t.enums({
  Admin: 'Admin',
  Manager: 'Manager',
  Developer: 'Developer',
});

const RegisterFormSchema = t.struct({
  name: t.String,
  email: t.String,
  username: t.maybe(t.String),
  password: t.String,
  role: RolesEnum,
});
const LoginFormSchema = t.struct({
  username_or_email: t.String,
  password: t.String,

});

const registerFormOpts = {
  fields: {
    password: {
      type: 'password'
    }
  }
};

const loginFormOpts = {
  fields: {
    username_or_email: {
      label: 'Username or Email',
      attrs: {
        autoFocus: true,
        placeholder: 'Type username or email',
      },
    },
    password: {
      type: 'password'
    }
  }
};

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      providerList: null,
    };
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
  }

  onLoginFormChange(value) {
    console.log(value)
    this.setState({loginForm: value})
  }
  onRegisterFormChange(value) {
    this.setState({registerForm: value})
  }
  onLoginSubmit(evt) {
    evt.preventDefault();
    loginFormOpts.hasError = false;
    loginFormOpts.error = null;
    const data = this.refs.loginForm.getValue();
    const valid = this.refs.loginForm.validate().isValid();
    console.log(valid);
    if (data && valid) {
      axios.post(`/auth/login`, data)
        .then(res => {
          if(res.data.success) {
            window.location = '/';
          } else {
            console.log(res.data.message);

            loginFormOpts.hasError = true;
            loginFormOpts.error = res.data.message;
          }
        });
    } else {
      loginFormOpts.hasError = true;
      loginFormOpts.error = this.refs.loginForm.validate().firstError().message;
    }
  }
  onRegisterSubmit(evt) {
    evt.preventDefault();
    registerFormOpts.hasError = false;
    registerFormOpts.error = null;
    const data = this.refs.registerForm.getValue();
    const valid = this.refs.registerForm.validate().isValid();
    console.log(valid);
    if (data && valid) {
      axios.post(`/auth/register`, data)
        .then(res => {
          console.log(res);
          if(res.data.success) {
            window.location = '/';
          } else {
            console.log(res.data.message);
            registerFormOpts.hasError = true;
            registerFormOpts.error = res.data.message;
          }
          //
        });
    } else {
      registerFormOpts.hasError = true;
      registerFormOpts.error = this.refs.registerForm.validate().firstError().message;
    }
  }

  componentWillMount() {
    axios.get(`/auth/providers`)
      .then(res => {
        const providers = res.data.providers;
        let providerList = [];
        for( let provider in providers) {
          providerList.push (
            <ul>
              <li><Button onClick={this.login(provider, 'Admin')} text={`${providers[provider].name} as Admin`} /></li>
              <li><Button onClick={this.login(provider, 'Manager')} text={`${providers[provider].name} as Manager`} /></li>
              <li><Button onClick={this.login(provider, 'Developer')} text={`${providers[provider].name} as Developer`} /></li>
            </ul>
          )
        }
        this.setState({ providerList });
      });
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
        <p>{cookie.load('jwt')}</p>
        <ul>
          <li><Button onClick={this.logout} text="Logout" /></li>
        </ul>
        <div>
          <form onSubmit={this.onRegisterSubmit}>
            <t.form.Form ref="registerForm" type={RegisterFormSchema} options={registerFormOpts} value={this.state.registerForm} onChange={this.onRegisterFormChange.bind(this)} />
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>

          <form onSubmit={this.onLoginSubmit}>
            <t.form.Form ref="loginForm" type={LoginFormSchema} options={loginFormOpts} value={this.state.loginForm} onChange={this.onLoginFormChange.bind(this)} />
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
          <h2>Login with</h2>
          {this.state.providerList}
        </div>
      </div>
    );
  }
}

export default Auth;
