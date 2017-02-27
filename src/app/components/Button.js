import React from 'react';

// stateless component
const Button = (props) => {
  return <input type="submit" value={props.text} onClick={props.onClick} />;
};

Button.propTypes = {
  text: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

Button.defaultProps = {
  text: 'Toggle',
  onClick: () => {},
};

export default Button;
