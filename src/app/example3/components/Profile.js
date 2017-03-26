import React from 'react';
import cookie from 'react-cookie';
import axios from 'axios';
import _ from 'lodash';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {};
  }

  componentWillMount() {
    if(!this.props.profile) {
      const token = cookie.load('jwt');
      if (token) {
        axios.defaults.headers.common['Authorization'] = 'JWT ' + token;
        axios.get(`/auth/profile`)
          .then(res => {
            const profile = res.data.user;
            this.setState({ ...profile });
          })
          .catch(err => {
            cookie.remove('jwt'); // remove stale/expired cookie
          });
      }
    } else {
      this.setState({ ...this.props.profile })
    }
  }

  render() {
    if (this.state.id) {
      return (
        <div>
          <h2>{this.state.name}'s {_.capitalize(this.state.provider)} Profile</h2>
          <ul>
            <li>id: {this.state.id}</li>
            {this.state.name ? <li>name: {this.state.name}</li> : null }
            {this.state.username ? <li>username: {this.state.username}</li> : null }
            {this.state.email ? <li>email: {this.state.email}</li> : null }
            <li>role: {this.state.role}</li>
            {this.state.photo ? <li>photo: <img src={this.state.provider === 'github' ? `${this.state.photo}&s=50` : this.state.photo} /></li> : null }
          </ul>
          <hr />
        </div>
      );
    } else {
      return (
        <div><h2>Not logged in!</h2></div>
      );
    }
  }
}

export default Profile;
