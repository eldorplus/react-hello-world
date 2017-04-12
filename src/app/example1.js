import React from 'react';
import T from 'i18n-react';
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

  componentDidMount() {
    this.render()
  }
  render() {
    return (
      <div>
        <h2><T.text text={{ key: "example.Example {number}", number: 1 }}/> - <small><T.text text={{ key: "example.click {count} to toggle", context: {count: 1} }}/></small></h2>
        <Button onClick={this.toggle} text={T.translate('example.Toggle message')} />
        { this.state.showMessage ? <Message><T.text text={{ key: "example.Hello World" }}/>!!!</Message> : null }
      </div>
    );
  }
}

export default Example1;
