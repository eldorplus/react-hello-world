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
        <Profile {...this.props.profile} />
        <Auth />
      </div>
    );
  }

};
