import React from 'react';
import Home from './components/Home';

const Example3App = (props) => {
  return (
    <div>
      <h2>Example 3 -
        <small>login via google auth</small>
      </h2>
      {props.children||<Home />}
    </div>
  );
};

module.exports = Example3App;
