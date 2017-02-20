import React from 'react';

// stateless component
const Message = (props) => {
    return (
        <p>{props.text}</p>
    )
};

Message.propTypes = {
    text: React.PropTypes.string,
};

Message.defaultProps = {
    text: 'Hello World',
};

module.exports = Message;