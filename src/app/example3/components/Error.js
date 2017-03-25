import React from 'react';

const Error = (props) => {
  return (
    <p><strong>Error {props.code} ({props.status})</strong>! {props.message}</p>
  );
};

Error.propTypes = {
  code: React.PropTypes.number,
  status: React.PropTypes.string,
  message: React.PropTypes.string,
};

Error.defaultProps = {
  code: 500,
  status: 'Exception',
  message: 'Unknown Error'
};

module.exports = Error;
