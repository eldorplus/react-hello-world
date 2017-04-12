import React from 'react';
import T from 'i18n-react';
import cookie from 'react-cookie';
import axios from 'axios';
import _ from 'lodash';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if (!this.props.user) {
      const token = cookie.load('jwt');
      if (token) {
        axios.defaults.headers.common.Authorization = `JWT ${token}`;
        axios.get('/auth/profile')
          .then((res) => {
            this.setState({ ...res.data.user });
          })
          .catch((err) => {
            if (err) cookie.remove('jwt'); // remove stale/expired cookie
          });
      }
    } else {
      this.setState({ ...this.props.user });
    }
  }

  render() {
    let children;
    if (this.state.id) {
      children = (
        <div>
          <h2>{this.state.name} {_.capitalize(this.state.provider)} {T.translate('User.Profile')}</h2>
          <ul>
            <li>id: {this.state.id}</li>
            {this.state.name ? <li>{T.translate('User.name')}: {this.state.name}</li> : null }
            {this.state.username ? <li>{T.translate('User.username')}: {this.state.username}</li> : null }
            {this.state.email ? <li>{T.translate('User.email')}: {this.state.email}</li> : null }
            <li>{T.translate('User.role')}: {this.state.role}</li>
            {this.state.photo ? <li>{T.translate('User.photo')}: <img src={this.state.provider === 'github' ? `${this.state.photo}&s=50` : this.state.photo} alt={this.state.name} /></li> : null }
          </ul>
          <hr />
        </div>
      );
    } else {
      children = (
        <div><h2>{T.translate('auth.Not logged in')}</h2></div>
      );
    }
    return children;
  }
}

Profile.propTypes = {
  user: React.PropTypes.node,
};

Profile.defaultProps = {
  user: null,
};

export default Profile;
