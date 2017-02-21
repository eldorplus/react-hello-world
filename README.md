react-hello-world
=================

In this tutorial we will create a button which shows and hides a message that says "Hello World".

## Writing a "Hello World" application

Firstly, create the project directory and cd into it:

    mkdir react-hello-world && cd react-hello-world
    
Initialize the project with `npm init` and Install:
- [webpack](https://webpack.js.org/) (to prepare our application for browsers) [webpack-dev-server](https://github.com/webpack/docs/wiki/webpack-dev-server)
- [babel](https://babeljs.io/) (to use newer javascript coding syntax and coding styles) [babel-loader](http://npm.taobao.org/package/babel-loader)

```
npm init
npm install babel-core babel-loader babel-preset-es2015 babel-preset-react webpack webpack-dev-server --save-dev
```

Let's create a `.babelrc` file so babel-knows how to parse our files, this is different than what we have in our `webpack.config.js` file.

    {
     "presets": [ "es2015", "react" ]
    }
    
We should add a command to `package.json` to build all application code with webpack, this will allow us to run `npm run build` to build the app.

    "build": "webpack -p",
    
With the project initialized and `webpack` installed, create the project `src/` and `static/` directories:
    
    mkdir src static
    
Inside of `src/` we will place all of our project code and inside of `static/` we will place our `index.html` file and `webpack` will generate `bundle.js` in `static`.

Let's create a `index.html` file in `static/` directory with these contents:

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Hello World</title>
        <script async src="bundle.js"></script>
    </head>
    <body>
        <div id='root'></div>
    </body>
    </html>
    
The project code(which the browser doesn't understand all the way) will be transpiled and compressed into a `bundle.js` file
    and downloaded by the browser. Once the project loads it will render the application the the `root` div.
    
Note: Having <script async src="..."></script> in the header ensures that the browser will start downloading JavaScript bundle before HTML content is loaded. (IE9+) [source](http://stackoverflow.com/questions/26566317/invariant-violation-registercomponent-target-container-is-not-a-dom-elem#26566330)
    
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
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react']
            }
          },
        ]
      },
      devtool: "source-map"
    };
    
    module.exports = config;
    
    
Let's install `React.js`:

    npm install react react-dom --save

Now we are ready to start writing the application code, lets add this content to `src/index.js`:

    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './app';
    
    ReactDOM.render(<App />, document.querySelector('#root'));

The `index.js` file above, loads the application into the `root` div element using react-dom library. Because we `import React` we don't need to load it with a `<script />` tag in the browser from `index.html`.

We can add `src/app.js` with these contents, we will have a few Examples loading from here:

    import React from 'react';
    import Example1 from './example1';
    
    const App = () => {
      return (
        <div>
          <Example1 />
        </div>
      );
    };
    
    export default App;

And here is the code for `src/example1.js`:

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
            <h2>Example 1 - <small>click once to toggle</small></h2>
            <Button onClick={this.toggle} text="Toggle message" />
            { this.state.showMessage ? <Message>Hello world!!!</Message> : null }
          </div>
        );
      }
    }
    
    export default Example1;
    
- Firstly, import React and our custom Button and Message components.
- create App class that extends React.Component so to manage state, either show message or don't show.
- In the constructor we add a default state with a boolean variable showMessage and bind the toggle function to current object scope, to toggle showMessage.
- In the toggle function we setState with the showMessage value reversed, if `true` will set it `false`, if `false` will set it `true`.
- Finally, in the render method we render both the Button and the Message(only if `showMessage` is equal to `true`)
    
The contents of our `src/components/Button.js` file are as follows:

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
    
We create a stateless component, a function which doesn't manage state, just sets the text and onClick function or the button.
Here we specify the propTypes for text as string and that it should default to Toggle if nothing is passed in when it is created.

The contents of our `src/components/Message.js` file look like this:

    import React from 'react';
    
    // stateless component
    const Message = (props) => {
      return (
        <p>{props.children}</p>
      );
    };
    
    Message.propTypes = {
      children: React.PropTypes.node,
    };
    
    Message.defaultProps = {
      children: 'Hello World',
    };
    
    module.exports = Message;
    
As you can see, we have another stateless component, which passes the child components for rendering. This can be either a string of text or any other components.

This makes for a simple hello world application with a button that toggles the message.

Let's go ahead and make another example `src/example2.js` with these contents:

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
            <h2>Example 2 - <small>click {this.props.numClicks} times to toggle</small></h2>
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

As you can see this file looks very similar to `example1.js` the only difference is we now have a clickedCount variable tracking the number of times the button has been clicked. 
This value gets updated each time the user clicks the button, `toggle` is called, incremeting the value until it reaches `numClicks` and resets the value while alternating the `showMessage` value.

## Production

We should install `http-server` to serve the application from a Docker container.

    npm install --save http-server
    
    
 Now let's create a `Dockerfile` with these contents, let's call this file `Dockerfile.production`:
 
    FROM node:6.9.5
    
    # Create app directory
    RUN mkdir -p /src/app
    WORKDIR /src/app
    
    # Install app dependencies
    COPY package.json /src/app/
    RUN npm install
    
    # Bundle app source
    COPY . /src/app
    
    # Check code quality with lint and test the app
    RUN npm run lint && npm run test
        
    # Build and optimize react app
    RUN npm run build
    
    EXPOSE 3000
    
    # defined in package.json
    CMD [ "npm", "run", "start:server" ]

If we have `docker` installed, we can run `docker-compose up` and it will bring up the application running in a docker container.
As you can see, this file creates the app directory and copies `package.json` into the app directory, which is inside the container.
Then it installs the application dependencies with `npm install`, and copies all of the application source(Bundle) into the container.
Now run lint and test to check the quality fo the code, using our tests and eslint configuration we have in place. 
If these don't pass, then the app shouldn't run, the container should fail to come up because the application can't run. 
If all tests pass though, then the app is allowed to build, run and serve the files on port 3000, you can connect to it and access the app from your favorite browser.

It's no fun having a `Dockerfile` without having a `docker-compose.yml` file, so let's add one having these lines:

    version: "2"
    
    services:
      react-hello-world:
        build:
          context: .
          dockerfile: Dockerfile.production
        ports:
          - '3000:3000'
        volumes:
          - .:/src/app

The `docker-compose.yml` file just simplifies the process of creating containers with `docker` by introducing the `docker-compose` command to do it.

With these files, in place we can now run `docker-compose up` and it will bring up the app, all tested and running, accessible from a browser on port 3000.
It's a good alternative in case you don't want to install all these libraries on your machine and have docker installed.

Ideally for production we would upload the application frontend files to Amazon S3 bucket and configure that bucket to host website. Webpack is a great tool to integrate into our workflow to achieve a smooth deployment system to the cloud.

https://webpack.js.org/guides/production-build/

## Testing

To make sure everything is working as expected before we deploy things to production we should add unit tests.

Run this command to install `eslint` `eslint-config-airbnb` `eslint-plugin-import` `eslint-plugin-jsx-a11y` `eslint-plugin-react`:

    export PKG=eslint-config-airbnb;
    npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG@latest"

Let's also install some dependencies for testing (jsdom, mocha, chai, jest-cli):

- jsdom mimics a web browser by providing the global variables found in a web browser. (A JavaScript implementation of the WHATWG DOM and HTML standards, for use with Node.js.)
- mocha is a feature-rich JavaScript test framework running on Node.js and the browser.
- chai BDD / TDD assertion library, for writing the tests.
- jest-cli Painless JavaScript Testing

    npm install --save-dev mocha chai jsdom jest-cli
    
Let's initialize eslint so it knows how to parse our code, type `eslint --init` and answer the questions like below:

    eslint --init
    ? How would you like to configure ESLint? Use a popular style guide
    ? Which style guide do you want to follow? Airbnb
    ? Do you use React? Yes
    ? What format do you want your config file to be in? JavaScript
    
Edit the `.eslintrc.js` file to add `browser: true` so `eslint` won't complain about `document` not being defined.

    "env": {
        "browser": true,
        "jasmine": true,
    }

    # error  'document' is not defined                      no-undef
    
Since our files use the `.js` extension for files with `jsx` code, eslint will complain unless we add these rules:

    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "arrow-body-style": ["error", "always"],
    }
    
    # error  JSX not allowed in files with extension '.js'  react/jsx-filename-extension
        
After the modification the `.eslintrc.js` file should look like this:
    
    module.exports = {
        "extends": "airbnb",
        "plugins": [
            "react",
            "jsx-a11y",
            "import"
        ],
        "env": {
            "browser": true,
            "jasmine": true,
        },
        "rules": {
            "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
            "arrow-body-style": ["error", "always"],
        }
    };

Now lets add some scripts to `package.json` to run these commands and tools easier from the commandline.

    "scripts": {
        "build": "webpack -p",
        "dev": "webpack-dev-server --content-base ./static",
        "start:server": "http-server -p 3000 ./static",
        "lint": "eslint src test",
        "test": "./node_modules/jest-cli/bin/jest.js --coverage --setupTestFrameworkScriptFile test/test_helper.js",
        "lint-and-test": "npm run lint && npm run test",
        "production": "docker-compose build react-hello-world && docker-compose up react-hello-world",
        "testing": "docker-compose build react-hello-world-test && docker-compose up react-hello-world-test"
    },
      
We should add `jest` to our `package.json` file:

      "jest": {
        "testEnvironment": "node"
      }
      
Let's create a `test/` directory to place all tests in there.

    mkdir test
    
Now add a `test/test_helper.js` file, it makes use of `jsdom` to make the code think it's running in a browser.
    
    /* globals global, window */
    
    import jsdom from 'jsdom';
    
    const doc = jsdom.jsdom('<!doctype html><html><body><div id="root"></div></body></html>', {
      url: 'http://localhost',
    });
    
    const win = doc.defaultView;
    
    win.sessionStorage = {
      getItem: (key) => {
        return this[key];
      },
      setItem: (key, value) => {
        this[key] = value;
      },
    };
    win.localStorage = win.sessionStorage;
    
    global.document = doc;
    global.window = win;
    
    Object.keys(window).forEach((key) => {
      if (!(key in global)) {
        global[key] = window[key];
      }
    });

This file prepares the unit tests to run as if it were running the code in a browser window.

Now we can add our first unit test, all it does is verify that the app gets rendered, rather the render function gets called.

    import ReactDOM, { render } from 'react-dom';
    import { expect } from 'chai';
    import '../src/index';
    
    describe('index', () => {
      it('calls render', () => {
        expect(ReactDOM, render).to.have.been.called; // eslint-disable-line no-unused-expressions
      });
    });
    
With these files in their places, now we can run `npm run lint-and-test`

Just for fun, let's add a new `Dockerfile.testing` file with these contents:

    FROM node:6.9.5
    
    # Create app directory
    RUN mkdir -p /src/app
    WORKDIR /src/app
    
    # Install app dependencies
    COPY package.json /src/app/
    RUN npm install
    
    # Bundle app source
    COPY . /src/app
    
    # defined in package.json
    CMD [ "npm", "run", "lint-and-test" ]

It only runs the tests and doesn't build the app or try to serve it.

We should add this to the `docker-compose.yml` file:

    react-hello-world-test:
        build:
          context: .
          dockerfile: Dockerfile.testing

You can run the test container in docker like this:

    docker-compose up react-hello-world-test
    
    # or with
    
    npm run testing

## The Project

#### Day 1
To begin, I'd like you to make something simple with javascript. The app should:

- show a button, and a "Hello World" message
- when you click the button it toggles the visibility of the message. So 1 click hides the message, 2 clicks makes it visible again.

Even though it's a very simple example, I'd like you to code it in a way that, to the best of your knowledge:

- will be a good experience for other devs (if this were a team project)
- would run efficiently in production.

Finally, please make notes on all of this stuff so we can go through it together.

#### Day 2
1) update it so that visibility only changes after every 3 clicks.

Eg:

- click, click, click -> visible
- click, click, click -> hidden

2) think about other areas of the code or workflow that you'd need to consider if you were deploying this to production

3) add some more to the Rationale section that cover things like tools or workflows you chose to use

## Rationale

##### code

To have a application that renders a button a message and keeps state for message shown or hidden.

1. Using `webpack` to prepare code and resources to serve to the browser, `index.html` uses he prepared `bundle.js` file.
2. Keep `src/index.js` as a thin wrapper to load the application into the root dom node, could then use other wrappers to load the application in different dom node.
3. The `src/app.js` application keeps a boolean state for `showMessage` variable used to show or hide the `Message` component, and defines a `toggle` method which sets the variable to true if false and false if true, updating the state. [stackoverflow/questions/24502898/show-or-hide-element](http://stackoverflow.com/questions/24502898/show-or-hide-element#24534492)
4. Bind the `toggle` method to `onClick` event, since the browser sends a event on button click, when that event fires, the `showMessage` variable is toggled.
5. Define the `Button` component and `Message` component as stateless, since there is no need for them to keep state because the parent component already does that with `showMessage`.
6. `Button` and `Message` both have defaultProps in case the developer doesn't pass in a text property, wanting to use a default value.

##### workflow

When making updates to the code(working on the application), we run `npm run dev`, this command executed `webpack-dev-server --content-base ./static` to transpile the code and hot-reload these changes into the web browser. 
If you run this command and make some changes the browser window will refresh and they will show up immediately.
