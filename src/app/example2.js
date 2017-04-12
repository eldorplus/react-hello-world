import React from 'react';
import T from 'i18n-react';
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
        <h2><T.text text={{ key: "example.Example {number}", number: 2 }}/> - <small><T.text text={{ key: "example.click {count} to toggle", context: {count: this.props.numClicks} }}/></small></h2>
        <Button onClick={this.toggle} text={T.translate('example.Toggle message')} />
        { this.state.showMessage ? <Message><T.text text={{ key: "example.Hello World" }}/>!!!</Message> : null }
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
