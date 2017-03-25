import React from 'react';
import cookie from 'react-cookie';
import axios from 'axios';
import _ from 'lodash';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {};
  }

  componentDidMount() {
    if(!this.props.profile) {
      axios.defaults.headers.common['Authorization'] = 'JWT ' + cookie.load('jwt');
      axios.get(`/auth/user`)
        .then(res => {
          const profile = res.data.user;
          this.setState({ ...profile });
        });
    } else {
      this.setState({ ...this.props.profile })
    }
  }

  render() {
    return (
      <div>
        <h2>{_.capitalize(this.state.provider)} Profile</h2>
        <ul>
          <li>id: {this.state.id}</li>
          <li>name: {this.state.name}</li>
          <li>username: {this.state.username}</li>
          <li>email: {this.state.email}</li>
          <li>role: {this.state.role}</li>
          <li>photo: <img src={this.state.photo} /></li>
        </ul>
        <hr />
      </div>
    );
  }
}

export default Profile;
