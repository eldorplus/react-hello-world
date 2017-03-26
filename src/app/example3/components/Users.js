import React from 'react';
import cookie from 'react-cookie';
import axios from 'axios';
import Profile from './Profile';
import Error from './Error';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  componentDidMount() {
    let that = this;
    const token = cookie.load('jwt');
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'JWT ' + token;
      axios.get(`/users`)
        .then(res => {
          const users = res.data.users;
          if (users) this.setState({users: [ ...users ]});
          else this.setState({error: {
            code: res.statusCode ? res.statusCode : null,
            status: res.statusText ? res.statusText : null,
            message: res.data.message ? res.data.message : null,
          }})
        })
        .catch(function (error) {
          if (error && error.response) {
            that.setState({
              error: {
                code: error.response.statusCode ? error.response.statusCode : null,
                status: error.response.statusText ? error.response.statusText : null,
                message: error.response.data.message ? error.response.data.message : null,
              }
            })
          }
        });
    }
  }

  render() {
    return (
      <div>
        <h2>Users</h2>
        {this.state.users ? this.state.users.map((user) => {
          return <Profile profile={user} />;
        }) : null}
        {this.state.error ? <Error {...this.state.error} /> : null}
      </div>
    );
  }
}

export default Users;
