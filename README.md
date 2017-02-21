react-hello-world
=================

In this tutorial we will create a button which shows and hides a message that says "Hello World".

Firstly, create the project directory and cd into it:

    mkdir react-hello-world && cd react-hello-world
    
Initialize the project with `npm init` and Install:
 - [webpack](https://webpack.js.org/) (to prepare our application for browsers)
 - [babel](https://babeljs.io/) (to use newer javascript coding syntax and coding styles)
    
    npm init
    npm install babel-core babel-loader babel-preset-es2015 babel-preset-react webpack --save-dev
    
With the project initialized and `webpack` installed create the project `src` and `static` directories:
    
    mkdir src static
    
Inside of `src/` we will place all of our project code and inside of `static/` we will place our index.html file and webpack will generate `bundle.js` in `static`.

Let's create a `index.html` file in `static/` directory with these contents:

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Hello World</title>
    </head>
    <body>
        <div id='root'></div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react.min.js"></script>
        <script src="bundle.js"></script>
    </body>
    </html>
    
The project code(which the browser doesn't understand all the way) will be transpiled and compressed into a `bundle.js` file
    and downloaded by the browser. Once the project loads it will render the application the the `root` div.
    
We need to create a [webpack.config.js](https://webpack.js.org/concepts/#loaders) file so `webpack` knows how to transpile the react application components.


Create a `webpack.config.js` file in the root of the project directory with these contents:

    const path = require('path');
    
    const config = {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'static'),
            filename: 'bundle.js'
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react']
                    }
                }
            ]
        }
    };
    
    module.exports = config;
    
    
Let's install `React.js`:

    npm install react react-dom --save

Now we are ready to start writing the application code, lets add this content to `src/index.js`:

    import ReactDOM from 'react-dom';
    import App from './app';
    
    ReactDOM.render(<App/>, document.querySelector('#root'));

The `index.js` file above, loads the application into the `root` div element using react-dom library.

We can add `src/app.js` with these contents:

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
    
- Firstly, import React and our custom Button and Message components.
- create App class that extends React.Component so to manage state, either show message or don't show.
- In the constructor we add a default state with a boolean variable showMessage and bind the toggle function to current object scope, to toggle showMessage.
- In the toggle function we setState with the showMessage value reversed, if `true` will set it `false`, if `false` will set it `true`.
- Finally, in the render method we render both the Button and the Message(only if `showMessage` is equal to `true`)
    
The contents of our `src/components/Button.js` file are as follows:

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
    
We create a stateless component, a function which doesn't manage state, just sets the text and onClick function or the button.
Here we specify the propTypes for text as string and that it should default to Toggle if nothing is passed in when it is created.

The contents of our `src/components/Message.js` file look like this:

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
    
As you can see, we have another stateless component, which only allos to set some text in a paragraph tag.

This makes for a simple hello world application with a button that toggles the message.

You can use `webpack --watch` to transpile the application as you are making changes and working on it. 
You can also install `webpack-dev-server` to serve the application locally on port 8080.

## The Project

To begin, I'd like you to make something simple with javascript. The app should:

- show a button, and a "Hello World" message
- when you click the button it toggles the visibility of the message. So 1 click hides the message, 2 clicks makes it visible again.

Even though it's a very simple example, I'd like you to code it in a way that, to the best of your knowledge:

- will be a good experience for other devs (if this were a team project)
- would run efficiently in production.

Finally, please make notes on all of this stuff so we can go through it together.

## Rationale

To have a application that renders a button a message and keeps state for message shown or hidden.

1. Using `webpack` to prepare code and resources to serve to the browser, `index.html` uses he prepared `bundle.js` file.
2. Keep `src/index.js` as a thin wrapper to load the application into the root dom node, could then use other wrappers to load the application in different dom node.
3. The `src/app.js` application keeps a boolean state for `showMessage` variable used to show or hide the `Message` component, and defines a `toggle` method which sets the variable to true if false and false if true, updating the state.
4. Bind the toggle method to `onClick` event, since the browser sends a event on button click, when that event fires, the `showMessage` variable is toggled.
5. Define the `Button` component and `Message` component as stateless, since there is no need for them to keep state because the parent component already does that with `showMessage`.
6. `Button` and `Message` both have defaultProps in case the developer doesn't pass in a text property, wanting to use a default value.
