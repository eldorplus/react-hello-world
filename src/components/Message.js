import React from 'react';

// stateless component
const Message = (props) => {
  return (
    <p>{props.children}</p>
  );
};

module.exports = Message;
