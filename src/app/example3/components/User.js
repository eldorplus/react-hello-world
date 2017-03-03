import React from 'react';

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>{this.props.params.userName}</h2>
      </div>
    );
  }
}

export default User;
