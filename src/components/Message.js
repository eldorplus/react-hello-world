import React from 'react';

// stateless component
const Message = (props) => {
  return (
    <p>{props.children}</p>
  );
};

Message.propTypes = {
  children: React.PropTypes.node,
};

Message.defaultProps = {
  children: 'Hello World',
};

module.exports = Message;
