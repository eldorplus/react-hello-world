import React from 'react';
import cookie from 'react-cookie';
import axios from 'axios';
import Profile from './Profile';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = 'JWT ' + cookie.load('jwt');
    axios.get(`/users`)
      .then(res => {
        const users = res.data.users;
        this.setState({users: [ ...users  ]});
      });
  }

  render() {
    return (
      <div>
        <h2>Users</h2>
        {this.state.users && this.state.users.map((user) => {
          return <Profile profile={user} />;
        })}
      </div>
    );
  }
}

export default Users;
