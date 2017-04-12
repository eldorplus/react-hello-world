import React from 'react';

const Error = (props) => {
  return (
    <div>
      Error {props.status + ':'} {props.statusText}
    </div>
  );
};

module.exports = Error;
