import React from 'react';
import NavLink from './components/NavLink';

const Example3App = (props) => {
  return (
    <div>
      <h2>Example 3 -
        <small>login via google auth</small>
      </h2>
      {props.children}
    </div>
  );
};

module.exports = Example3App;
