import React from 'react';
import Button from './components/Button';
import Message from './components/Message';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMessage: true,
        };
        this.toggle = this.toggle.bind(this)
    }
    toggle() {
        this.setState({showMessage: !this.state.showMessage})
    }
    render() {
        return (
            <div>
                <Button onClick={this.toggle} text="Toggle message"/>
                { this.state.showMessage ? <Message text="Hello world!"/> : null }
            </div>
        );
    }
}

export default App;