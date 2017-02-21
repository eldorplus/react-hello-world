import React from 'react';
import Button from './components/Button';
import Message from './components/Message';

class Example1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMessage: true,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ showMessage: !this.state.showMessage });
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle} text="Toggle message" />
        { this.state.showMessage ? <Message>Hello world!!!</Message> : null }
      </div>
    );
  }
}

export default Example1;
