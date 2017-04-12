import React from 'react';
import T from 'i18n-react';
import cookie from 'react-cookie';
import Home from './components/Home';

const Example3App = (props) => {
  return (
    <div>
      <h2>
        <T.text text={{ key: "example.Example {number}", number: 3 }}/> - <small><T.text text={{ key: "example.login via google auth" }}/></small>
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
