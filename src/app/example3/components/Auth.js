import React from 'react';
import axios from 'axios';
import t from 'tcomb-form';
import cookie from 'react-cookie';
import T from 'i18n-react';
import Button from './../../components/Button';
import NavLink from './NavLink';

import language from './../../language';

T.setTexts(require(`./../../../locales/${language()}`));

const RolesEnum = t.enums({
  Admin: T.translate('User.Admin'),
  Manager: T.translate('User.Manager'),
  Developer: T.translate('User.Developer'),
  // Admin: 'Admin',
  // Manager: 'Manager',
  // Developer: 'Developer',
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
    name: {
      label: T.translate('auth.Name'),
    },
    email: {
      label: T.translate('auth.Email'),
    },
    username: {
      label: `${T.translate('auth.Username')} (${T.translate('optional')})`,
    },
    password: {
      label: T.translate('auth.Password'),
      type: 'password',
    },
    role: {
      label: T.translate('auth.Role'),
    },
  },
};

const loginFormOpts = {
  fields: {
    username_or_email: {
      label: T.translate('auth.Username or Email'),
      attrs: {
        autoFocus: true,
        placeholder: T.translate('auth.Type username or email'),
      },
    },
    password: {
      label: T.translate('auth.Password'),
      type: 'password',
    },
  },
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

  componentWillMount() {
    axios.get('/auth/providers')
      .then((res) => {
        const providers = res.data.providers;
        const providerList = [];
        Object.keys(providers).map((provider) => {
          providerList.push(
            <ul>
              <li><Button onClick={this.login(provider, 'Admin')} text={`${providers[provider].name} ${T.translate('auth.as Admin')}`} /></li>
              <li><Button onClick={this.login(provider, 'Manager')} text={`${providers[provider].name} ${T.translate('auth.as Manager')}`} /></li>
              <li><Button onClick={this.login(provider, 'Developer')} text={`${providers[provider].name} ${T.translate('auth.as Developer')}`} /></li>
            </ul>,
          );
          return provider;
        });
        this.setState({ providerList });
      });
  }

  onLoginSubmit(evt) {
    evt.preventDefault();
    loginFormOpts.hasError = false;
    loginFormOpts.error = null;
    const data = this.loginForm.getValue();
    const valid = this.loginForm.validate().isValid();
    if (data && valid) {
      axios.post('/auth/login', data)
        .then((res) => {
          if (res.data.success) {
            window.location = '/';
          } else {
            loginFormOpts.hasError = true;
            loginFormOpts.error = res.data.message;
          }
        });
    } else {
      loginFormOpts.hasError = true;
      loginFormOpts.error = this.loginForm.validate().firstError().message;
    }
  }
  onRegisterSubmit(evt) {
    evt.preventDefault();
    registerFormOpts.hasError = false;
    registerFormOpts.error = null;
    const data = this.registerForm.getValue();
    const valid = this.registerForm.validate().isValid();
    if (data && valid) {
      axios.post('/auth/register', data)
        .then((res) => {
          if (res.data.success) {
            // this.context.router.transitionTo('/');
            document.location.href = '/';
          } else {
            registerFormOpts.hasError = true;
            registerFormOpts.error = res.data.message;
          }
          //
        });
    } else {
      registerFormOpts.hasError = true;
      registerFormOpts.error = this.registerForm.validate().firstError().message;
    }
  }

  onLoginFormChange(value) {
    this.setState({ loginForm: value });
  }
  onRegisterFormChange(value) {
    this.setState({ registerForm: value });
  }

  login(provider, role) {
    return () => {
      document.location.href = `/auth/${provider}?role=${role}&success=/&failure=/`;
      // this.context.router.transitionTo(`/auth/${provider}?role=${role}&success=/&failure=/`);
    };
  }
  logout() {
    cookie.remove('jwt'); // remove cookie on frontend and redirect to logout where does same thing possibly plus more
    // this.context.router.transitionTo('/auth/logout?success=/&failure=/');
    document.location.href = '/auth/logout?success=/&failure=/';
  }
  render() {
    return (
      <div>
        <div><NavLink to="/users">{T.translate('auth.All Users')}</NavLink></div>
        <p>{cookie.load('jwt')}</p>
        <ul>
          <li><Button onClick={this.logout} text={T.translate('auth.Logout')} /></li>
        </ul>
        <div>
          <form onSubmit={this.onRegisterSubmit}>
            <t.form.Form
              ref={(c) => { this.registerForm = c; }}
              type={RegisterFormSchema}
              options={registerFormOpts}
              value={this.state.registerForm}
              onChange={this.onRegisterFormChange}
            />
            <div className="form-group">
              <button type="submit" className="btn btn-primary">{T.translate('auth.Register')}</button>
            </div>
          </form>

          <form onSubmit={this.onLoginSubmit}>
            <t.form.Form
              ref={(c) => { this.loginForm = c; }}
              type={LoginFormSchema}
              options={loginFormOpts}
              value={this.state.loginForm}
              onChange={this.onLoginFormChange}
            />
            <div className="form-group">
              <button type="submit" className="btn btn-primary">{T.translate('auth.Login')}</button>
            </div>
          </form>
          <h2>{T.translate('auth.Login with')}</h2>
          {this.state.providerList}
        </div>
      </div>
    );
  }
}

export default Auth;
