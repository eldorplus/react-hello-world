import React from 'react';
import Profile from './Profile';
import Auth from './Auth';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.profile && this.props.profile.id ? <Profile {...this.props.profile} /> : 'Nothing' }
        <Auth />
      </div>
    );
  }

};
