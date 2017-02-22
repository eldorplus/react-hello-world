import React from 'react';
import Button from './components/Button';
import Message from './components/Message';

class Example2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMessage: true,
      clickedCount: 1,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ clickedCount: this.state.clickedCount + 1 });
    if (this.state.clickedCount >= this.props.numClicks) {
      this.setState({
        showMessage: !this.state.showMessage,
        clickedCount: 1,
      });
    }
  }

  render() {
    return (
      <div>
        <h2>Example 2 - <small>{'click ' + this.props.numClicks + ' times to toggle'}</small></h2>
        <Button onClick={this.toggle} text="Toggle message" />
        { this.state.showMessage ? <Message>Hello world!!!</Message> : null }
      </div>
    );
  }
}

Example2.propTypes = {
  numClicks: React.PropTypes.number,
};

Example2.defaultProps = {
  numClicks: 2,
};

export default Example2;
