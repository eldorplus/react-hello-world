import React from 'react';
import Home from './components/Home';

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

Example3App.propTypes = {
  children: React.PropTypes.node,
};

Example3App.defaultProps = {
  children: <Home />,
};

module.exports = Example3App;
