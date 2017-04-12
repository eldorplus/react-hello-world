import React from 'react';

const Error = (props) => {
  if (props.status && props.statusText) {
    return (
      <div>
        Error {props.status}: {props.statusText}
      </div>
    );
  } else {
    return (
      <div>
        Error
      </div>
    );
  }
};

module.exports = Error;
