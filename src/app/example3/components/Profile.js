import React from 'react';
import _ from 'lodash';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  render() {
    return (
      <div>
        <h2>{_.capitalize(this.props.provider)} Profile</h2>
        <ul>
          <li>name: {this.props.name}</li>
          <li>username: {this.props.username}</li>
          <li>email: {this.props.email}</li>
          <li>role: {this.props.role}</li>
          <li>photo: <img src={this.props.photo} /></li>
        </ul>
      </div>
    );
  }
}

export default Profile;
