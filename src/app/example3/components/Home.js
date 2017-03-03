import React from 'react';
import cookie from 'react-cookie';
import Dashboard from './Dashboard';
import Auth from './Auth';

export default class Home extends React.Component {
  componentWillMount() {
    this.state =  {
      profile: cookie.load('profile'),
    };
  }

  render() {
    return (
      <div>
        {this.state.profile && this.state.profile.id ? <Dashboard profile={this.state.profile} /> : <Auth /> }
      </div>
    );
  }

};
