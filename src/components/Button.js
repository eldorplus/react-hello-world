import React from 'react';

// stateless component
const Button = (props) => <input type="submit" value={props.text} onClick={props.onClick} />

Button.propTypes = {
    text: React.PropTypes.string,
};

Button.defaultProps = {
    text: 'Toggle',
};

export default Button;