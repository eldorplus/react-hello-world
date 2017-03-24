import React from 'react';
import cookie from 'react-cookie';
import axios from 'axios';
import Dashboard from './Dashboard';
import Auth from './Auth';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      profile: {}
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = 'JWT ' + cookie.load('jwt');
    axios.get(`/auth/user`)
      .then(res => {
        const profile = res.data.user;
        this.setState({ profile });
      });
  }

  render() {
    return (
      <div>
        {this.state.profile && this.state.profile._id ? <Dashboard profile={this.state.profile} /> : <Auth /> }
      </div>
    );
  }

};
