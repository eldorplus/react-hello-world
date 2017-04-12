import React from 'react';
import T from 'i18n-react';
import cookie from 'react-cookie';
import axios from 'axios';
import Profile from './Profile';
import Error from './Error';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  componentDidMount() {
    const token = cookie.load('jwt');
    if (token) {
      axios.defaults.headers.common.Authorization = `JWT ${token}`;
      axios.get('/api/1.1/users')
        .then((res) => {
          const users = res.data.users;
          if (users) {
            this.setState({ users: [...users] });
          } else {
            this.setState({ error: {
              code: res.statusCode ? res.statusCode : null,
              status: res.statusText ? res.statusText : null,
              message: res.data.message ? res.data.message : null,
            } });
          }
        })
        .catch((e) => {
          if (e && e.response) {
            this.setState({
              error: {
                code: e.response.statusCode ? e.response.statusCode : null,
                status: e.response.statusText ? e.response.statusText : null,
                message: e.response.data.message ? e.response.data.message : null,
              },
            });
          }
        });
    }
  }

  render() {
    return (
      <div>
        <h2>Users</h2>
        {this.state.users ? this.state.users.map((user) => {
          return <Profile user={user} />;
        }) : null}
        {this.state.error ? <Error {...this.state.error} /> : null}
      </div>
    );
  }
}

export default Users;
