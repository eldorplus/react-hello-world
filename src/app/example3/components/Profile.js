import React from 'react';
import _ from 'lodash';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>{_.capitalize(this.props.provider)} Profile</h2>
        <ul>
          <li>photo: <img src={this.props.photo} /></li>
          <li>name: {this.props.name}</li>
          <li>role: {this.props.userRole}</li>
        </ul>
      </div>
    );
  }
}

export default Profile;
