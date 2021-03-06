[react-hello-world](https://github.com/gxela/react-hello-world)
===============================================================

[![THIS](https://img.shields.io/badge/React%20Hello%20World-Tutorial-blue.svg)](https://github.com/gxela/react-hello-world) [![Travis](https://img.shields.io/travis/gxela/react-hello-world/master.svg)](https://travis-ci.org/gxela/react-hello-world) [![Codeship](https://img.shields.io/codeship/c1bab050-dacf-0134-662d-4a7ecfb8dfa8/master.svg)](https://app.codeship.com/projects/203832) [![CircleCI](https://img.shields.io/circleci/project/github/gxela/react-hello-world/master.svg)](https://circleci.com/gh/gxela/react-hello-world) [![Scrutinizer](https://img.shields.io/scrutinizer/g/gxela/react-hello-world.svg)](https://scrutinizer-ci.com/g/gxela/react-hello-world/) [![Scrutinizer Inspections](https://img.shields.io/scrutinizer/coverage/g/gxela/react-hello-world.svg)](https://scrutinizer-ci.com/g/gxela/react-hello-world/inspections)
[![React Hello World](screenshots/rendered-react-app.png "Open React Hello World")](http://localhost:8000)

---
### Writing a "Hello World" application

Firstly, create the project directory and cd into it:

    mkdir react-hello-world && cd react-hello-world
    
Initialize the project by running `npm init` in the command prompt, then answer some questions to generate a `package.json` file for the project.

```
npm init
```

---
### Project dependencies

Here is a list of packages that will be installed and configured for this project:

- **[babel-core](https://www.npmjs.com/package/babel-core)** - Babel compiler core.
- **[babel-jest](https://www.npmjs.com/package/babel-jest)** - Babel jest plugin.
- **[babel-loader](https://www.npmjs.com/package/babel-loader)** - babel module loader for webpack.
- **[babel-polyfill](https://www.npmjs.com/package/babel-polyfill)** - Provides polyfills necessary for a full ES2015+ environment.
- **[babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015)** - Babel preset for all es2015 plugins.
- **[babel-preset-jest](https://www.npmjs.com/package/babel-preset-jest)** - Babel preset for all Jest plugins. This preset is automatically included when using babel-jest.
- **[babel-preset-react](https://www.npmjs.com/package/babel-preset-react)** - Babel preset for all React plugins.
- **[babelify](https://www.npmjs.com/package/babelify)** - Babel browserify transform.
- **[bluebird](https://www.npmjs.com/package/bluebird)** - Full featured Promises/A+ implementation with exceptionally good performance.
- **[brfs](https://www.npmjs.com/package/brfs)** - browserify fs.readFileSync() static asset inliner.
- **[browserify](https://www.npmjs.com/package/browserify)** - browser-side require() the node way.
- **[browserify-shim](https://www.npmjs.com/package/browserify-shim)** - Makes CommonJS-incompatible modules browserifyable.
- **[chance](https://www.npmjs.com/package/chance)** - Utility library to generate anything random.
- **[eslint](https://www.npmjs.com/package/eslint)** - An AST-based pattern checker for JavaScript.
- **[eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)** - Airbnb's ESLint config, following our styleguide.
- **[eslint-loader](https://www.npmjs.com/package/eslint-loader)** - eslint loader (for webpack).
- **[eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)** - This plugin intends to support linting of ES2015+ (ES6+) import/export syntax, and prevent issues with misspelling of file paths and import names.
- **[eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest)** - Eslint rules for Jest.
- **[eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)** - Static AST checker for accessibility rules on JSX elements.
- **[eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)** - React specific linting rules for ESLint.
- **[expect](https://github.com/mjackson/expect)** - Lets you write better assertions.
- **[express](http://expressjs.com)** - To run a production server for serving the application with [pm2](http://pm2.keymetrics.io/).
- **[jasmine](https://jasmine.github.io/)** - Jasmine is a behavior-driven development framework for testing JavaScript code. It does not depend on any other JavaScript frameworks. It does not require a DOM. And it has a clean, obvious syntax so that you can easily write tests.
- **[jest](https://github.com/facebook/jest)** - Painless JavaScript Testing.
- **[jsdom](https://github.com/tmpvar/jsdom)** - A JavaScript implementation of the WHATWG DOM and HTML standards, for use with Node.js.
- **[istanbul](https://github.com/gotwarlost/istanbul)** - Yet another JS code coverage tool that computes statement, line, function and branch coverage with module loader hooks to transparently add coverage when running tests. Supports all JS coverage use cases including unit tests, server side functional tests.
- **[karma](https://github.com/karma-runner/karma)** - Spectacular Test Runner for JavaScript.
- **[karma-babel-preprocessor](https://www.npmjs.com/package/karma-babel-preprocessor)** - Preprocessor to compile ES6 on the fly with babel.
- **[karma-browserify](https://www.npmjs.com/package/karma-browserify)** - A fast browserify integration for Karma that handles large projects with ease.
- **[karma-coverage](https://www.npmjs.com/package/karma-coverage)** - A Karma plugin. Generate code coverage.
- **[karma-jasmine](https://www.npmjs.com/package/karma-jasmine)** - A Karma plugin - adapter for Jasmine testing framework.
- **[karma-phantomjs-launcher](https://www.npmjs.com/package/karma-phantomjs-launcher)** - A Karma plugin. Launcher for PhantomJS.
- **[lodash](https://lodash.com/)** - A modern JavaScript utility library delivering modularity, performance & extras.
- **[mocha](http://mochajs.org/)** - Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun.
- **[phantomjs](https://www.npmjs.com/package/phantomjs)** - Headless WebKit with JS API.
- **[pm2](http://pm2.keymetrics.io/)** - Production process manager for Node.JS applications with a built-in load balancer.
- **[react](https://facebook.github.io/react/)** - A declarative, efficient, and flexible JavaScript library for building user interfaces.
- **[react-dom](https://www.npmjs.com/package/react-dom)** - React package for working with the DOM.
- **[react-addons-test-utils](https://www.npmjs.com/package/react-addons-test-utils)** - This package provides the React TestUtils add-on.
- **[react-test-renderer](https://www.npmjs.com/package/react-test-renderer)** - React package for snapshot testing. This package provides an experimental React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment.
- **[request](https://www.npmjs.com/package/request)** - Simplified HTTP request client.
- **[request-promise](https://www.npmjs.com/package/request-promise)** - The simplified HTTP request client 'request' with Promise support. Powered by Bluebird.
- **[watchify](https://www.npmjs.com/package/watchify)** - watch mode for browserify builds.
- **[webpack](https://webpack.js.org/)** - Packs CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand. Support loaders to preprocess files, i.e. json, jsx, es7, css, less, ... and your custom stuff.
- **[webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server)** - Serves a webpack app. Updates the browser on changes.

---
### Setup and configure the project

Let's install `React`:

    npm install --save react react-dom lodash
    
---
### Install and configure eslint

Run this command to install `eslint` `eslint-config-airbnb` `eslint-plugin-import` `eslint-plugin-jsx-a11y` `eslint-plugin-react`:

    export PKG=eslint-config-airbnb;
    npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG@latest"

Let's initialize eslint so it knows how to parse our code, type `eslint --init` and answer the questions like below:

    eslint --init
    ? How would you like to configure ESLint? Use a popular style guide
    ? Which style guide do you want to follow? Airbnb
    ? Do you use React? Yes
    ? What format do you want your config file to be in? JavaScript
    
Edit the `.eslintrc.js` file to add `browser: true` so `eslint` won't complain about `document` not being defined and `jasmine: true` so it won't complain about `describe` not being defined.

    "env": {
        "browser": true,
        "jasmine": true,
    }

**Error**: error  'document' is not defined                      no-undef
    
Since our files use the `.js` extension for files with `jsx` code, eslint will complain unless we add these rules:

    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "arrow-body-style": ["error", "always"],
    }
    
**Error**: error  JSX not allowed in files with extension '.js'  react/jsx-filename-extension
        
After the modification the `.eslintrc.js` file should look like this:
    
    module.exports = {
      "extends": "airbnb",
      "plugins": [
        "react",
        "jsx-a11y",
        "import",
      ],
      "env": {
        "browser": true,
        "jasmine": true,
      },
      "rules": {
        "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
        "arrow-body-style": ["error", "always"],
      }
    };

We are using `eslint --ignore-path .gitignore .` for `lint` run-script because it uses our ignore file to ignore static and coverage. Alternative is `eslint --ignore-pattern "/coverage/" --ignore-pattern "/static/" .`

---
### Install and configure webpack and babel

Install `babel` and `webpack` and some loaders(babel-loader, eslint-loader) and presets(es2015, react) for babel:

    npm install --save-dev webpack webpack-dev-server babel-core babel-preset-es2015 babel-preset-react babel-loader eslint-loader

Create a `.babelrc` file with these contents, so babel-knows how to parse our project code.

    {
     "presets": ["es2015", "react"]
    }
    
Create a `webpack.config.js` file in the root of the project directory with these contents:

    const path = require('path');
    
    const config = {
      entry: './src/index.js',
      output: {
        path: path.resolve(__dirname, 'static'),
        filename: 'bundle.js',
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react'],
            },
          },
          {
            test: /\.jsx?$/,
            loader: 'eslint-loader',
            exclude: /(node_modules|bower_components)/,
          },
        ],
      },
      devtool: 'source-map',
    };
    
    module.exports = config;
    
Make sure to add the `eslint-loader` after the `babel-loader`, otherwise you will get all kinds of errors about the project code that don't make sense. The order of the loaders matters. For example, the error below:

**Error**: error  'use strict' is unnecessary inside of modules

The above `webpack.config.js` executes eslint over our source code after compiling all the code with webpack babel-loader. neat huh!

To make sure everything is working as expected before we deploy things to production we should add unit tests.

---
### Install and configure jest

Let's install `mocha`, `expect`, `jsdom` and `jest` for testing our project code:

```
npm install --save-dev mocha expect jsdom jest
```

Create a new directory where all of the tests specific to `jest` will go, called `test/` and karma tests will go in `src/`.
`jest` runs the tests located in `src/` and `test/`, karma only runs tests located in `src/` directory.

    mkdir test
    
We need a test helper to make `jest` work, this is where we will be using `jsdom`.
Create a file named `test/jest_helper.js` with this javascript code:

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

Install `babel-preset-jest` and add it to `.babelrc` `"presets": ["jest"]`, also add it to `babel-loader` in `webpack.config.js`:

    npm install --save-dev jest babel-jest babel-preset-jest eslint-plugin-jest react-test-renderer
    
Update `.eslintrc.js` to look like this:

    module.exports = {
      "extends": "airbnb",
      "plugins": [
        "react",
        "jsx-a11y",
        "import",
        "jest",
      ],
      "env": {
        "browser": true,
        "jasmine": true,
        "jest/globals": true
      },
      "rules": {
        "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
        "arrow-body-style": ["error", "always"],
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
      }
    };

Update `.babelrc` to look like this:

    {
      "presets": ["es2015", "react", "jest"]
    }
    
Now add some `run-scripts` to `package.json`:

    "build": "./node_modules/webpack/bin/webpack.js -p",
    "lint": "./node_modules/eslint/bin/eslint.js --ignore-path .gitignore .",
    "dev": "./node_modules/webpack-dev-server/bin/webpack-dev-server.js --content-base ./static",
    "test": "./node_modules/jest/bin/jest.js --collectCoverageFrom='[\"src/**/**/**/*.js\"]' --coverage --verbose --setupTestFrameworkScriptFile test/jest_helper.js",
    "jest": "npm run lint; ./node_modules/jest/bin/jest.js --collectCoverageFrom='[\"src/**/**/**/*.js\"]' --coverage --setupTestFrameworkScriptFile test/jest_helper.js --watchAll --no-cache",
    "lint-and-test": "npm run lint; npm run test -- -u",

---
### Install and configure pm2

With the project initialized, we have testing tools and `webpack` installed, create the project `src/` and `static/` directories:
    
    mkdir src static
    
Inside of `src/` we will place all of our project code and inside of `static/` we will place our `index.html` file and `webpack` will generate `bundle.js` in `static/`.

Install `express` and `pm2`:

    npm install --save express pm2 bluebird request request-promise 
    
We should add a `pm2` configuration file, called `process.yml` in the root of the project directory that looks like this:

    apps: 
      - script: src/server/index.js 
        name: react-hello-world 
        instances: 2 
        exec_mode: cluster 
        watch: true 
        env:
          NODE_ENV: development
        env_production:
          NODE_ENV: production
          
---
###  Write tested backend server code

Create a new directory `src/server/`:

    mkdir src/server
    
Create a new file `src/server/index.js` with these contents:

    const server = require('./app');
    
    module.exports = server.start();
    
This file starts up the application server on default port `8000`. Now let's add the the `src/server/app.js`:

Let's create a unit test to test the application server, file located in `test/server/index.spec.js`:

    const server = require('./../../src/server/app');
    
    describe('Server', () => {
      it('start gets called', (done) => {
        spyOn(server, 'start');
        require('./../../src/server/index'); // eslint-disable-line global-require
        expect(server.start).toHaveBeenCalled();
        done();
      });
    });
    
Now we should add the server code in `src/server/app.js` from [http://stackoverflow.com/questions/13176245/automate-jasmine-node-and-express-js](http://stackoverflow.com/questions/13176245/automate-jasmine-node-and-express-js):

    const config = require('./../../src/server/config');
    
    exports.start = function start(options, readyCallback) {
      const opts = options || {};
      if (!this.server) {
        const express = require('express'); // eslint-disable-line global-require
        const app = express();
    
        app.use(express.static('static'));
    
        const port = opts.port || process.env.PORT || config.port;
        const name = opts.name || process.env.name || 'node';
    
        const instance = parseInt(process.env.NODE_APP_INSTANCE, 10) + 1 || 0;
        const instances = process.env.instances ? ` ${instance}/${process.env.instances}` : '';
    
        this.server = app.listen(port, () => {
          console.info(`${name}${instances} listening on port ${port} in ${process.env.NODE_ENV} mode`); // eslint-disable-line no-console
          // callback to call when the server is ready
          if (readyCallback) {
            readyCallback();
          }
        });
      }
      return this.server;
    };
    
We should test our server app, `test/server/app.spec.js`:

    import expect from 'expect';
    import server from './../../src/server/app';
    import config from './../../src/server/config/testing';
    
    describe('Server app', () => {
      it('executes callback and returns the server instance', (done) => {
        expect(server.start({ port: config.port }, () => { return done(); })).toIncludeKeys(['_connections', '_events', '_handle']);
      });
    });

`src/server/config/index.js`:

    const _ = require('lodash');
    
    const defaults = {
      name: 'react-hello-world',
      env: process.env.NODE_ENV,
      port: 8080,
    };
    
    /* eslint-disable */
    module.exports = _.merge(defaults, require(`./${process.env.NODE_ENV === 'test' ? 'testing' : process.env.NODE_ENV}.js`) || {});
    /* eslint-enable */
    
`test/server/config/index.spec.js`:

    import expect from 'expect';
    import config from './../../../src/server/config';
    
    describe('Server config index', () => {
      it('should contain property name', (done) => {
        expect(config).toIncludeKeys(['name']);
        done();
      });
      it('should contain property port', (done) => {
        expect(config).toIncludeKeys(['port']);
        done();
      });
      it('should contain property env', (done) => {
        expect(config).toIncludeKeys(['env']);
        done();
      });
    });

`src/server/config/production.js`:

    module.exports = {
      port: 8000,
    };

`test/server/config/production.spec.js`:

    import expect from 'expect';
    import config from './../../../src/server/config/production';
    
    describe('Server config production', () => {
      it('should contain property port equal to 8000', (done) => {
        expect(config).toIncludeKeys(['port']);
        expect(config.port).toBe(8000);
        done();
      });
    });

`src/server/config/testing.js`:

    module.exports = {
      port: 9999,
    };

`test/server/config/testing.spec.js`:

    import expect from 'expect';
    import config from './../../../src/server/config';
    
    describe('Server config testing', () => {
      it('should contain property env equal to test', (done) => {
        expect(config).toIncludeKeys(['env']);
        expect(config.env).toBe('test');
        done();
      });
      it('should contain property port equal to 9999', (done) => {
        expect(config).toIncludeKeys(['port']);
        expect(config.port).toBe(9999);
        done();
      });
    });

Inside of `package.json` add a few commands to `scripts`:

    "start": "./node_modules/pm2/bin/pm2 start --env production process.yml", 
    "restart": "./node_modules/pm2/bin/pm2 restart react-hello-world",
     "stop": "./node_modules/pm2/bin/pm2 stop react-hello-world", 
    "show": "./node_modules/pm2/bin/pm2 show react-hello-world", 
    "kill": "./node_modules/pm2/bin/pm2 kill", 
    "list": "./node_modules/pm2/bin/pm2 list", 
    "monit": "./node_modules/pm2/bin/pm2 monit", 
    "logs": "./node_modules/pm2/bin/pm2 logs",

When we execute `npm start` in the commandline/terminal it runs that application, we can stop, restart and kill the application as well with the scripts we have defined in package.json as shown above.
    
---
### React the App to the power of X or create the app

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
    
**Note**: Having <script async src="..."></script> in the header ensures that the browser will start downloading JavaScript bundle before HTML content is loaded. (IE9+) [source](http://stackoverflow.com/questions/26566317/invariant-violation-registercomponent-target-container-is-not-a-dom-elem#26566330)
    
Now we are ready to start writing the application code, lets add this content to `src/index.js`:

    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './app';
    
    ReactDOM.render(<App />, document.querySelector('#root'));

The `src/index.js` file above, loads the application into the `root` div element using react-dom library. Because we `import React` we don't need to load it with a `<script />` tag in the browser from `index.html`, it should be part of the compiled `bundle.js`.

Lets add our first unit test! This test will be ran by `jest`. All it does is verify that the render function gets called. If you comment out the `require` line, the test will fail.

`test/index.spec.js`:

    import ReactDOM from 'react-dom';
    import expect from 'expect'; // eslint-disable-line import/no-extraneous-dependencies
    
    describe('index', () => {
      it('calls render', () => {
        const spy = expect.spyOn(ReactDOM, 'render');
        require('../src/index'); // eslint-disable-line global-require
        expect(spy).toHaveBeenCalled(); // eslint-disable-line no-unused-expressions
      });
    });
    
Now add `src/app.js` file with these contents, we will have a few Examples loading from here:

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

Are we going to test our new App component? Of course we are! Create a new file `test/app.spec.js` with this in it:

    import React from 'react';
    import renderer from 'react-test-renderer';
    import App from '../src/app';
    
    describe('App snapshot', () => {
      it('should render snapshot', () => {
        const component = renderer.create(
          <App />,
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

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
    
Let's add a test for `Example1` in `test/example1.spec.js` with this:

    import React from 'react';
    import renderer from 'react-test-renderer';
    
    import Example1 from '../src/example1';
    
    describe('Example 1 snapshot', () => {
      it('should toggle Message on each click', () => {
        const component = renderer.create(
          <Example1 />,
        );
        let tree = component.toJSON();
    
        tree.children[1].props.onClick();
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    
        tree.children[1].props.onClick();
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
    
Lets not forget about our `Button` which is required by `Example1`, the contents of `src/components/Button.js`:

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

Create a `components/` directory in `test/` and add a test for our `Button` component in `test/components/Button.spec.js`, just to test out object instantiation with different params:

    /* eslint-disable import/no-extraneous-dependencies */
    
    import React from 'react';
    import renderer from 'react-test-renderer';
    import Button from './../../src/components/Button';
    
    describe('Button component snapshot', () => {
      it('should render with defaults', () => {
        const component = renderer.create(
          <Button />,
        );
        const tree = component.toJSON();
        expect(tree.props.value).toEqual('Toggle');
        expect(tree).toMatchSnapshot();
      });
      it('should render with text: Toggle message', () => {
        const component = renderer.create(
          <Button text="Toggle message" />,
        );
        const tree = component.toJSON();
        expect(tree.props.value).toEqual('Toggle message');
        expect(tree).toMatchSnapshot();
      });
      it('should have a onClick callback returning "Button clicked!"', () => {
        const component = renderer.create(
          <Button onClick={() => { return 'Button clicked!'; }} />,
        );
        const tree = component.toJSON();
        expect(tree.props.onClick()).toEqual('Button clicked!');
        expect(tree).toMatchSnapshot();
      });
    });

`Message` also required by `Example1`, the contents of `src/components/Message.js` file look like this:

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

We have to test our `Message`, add a new test in `test/components/Message.spec.js`:

    /* eslint-disable import/no-extraneous-dependencies */
    
    import React from 'react';
    import renderer from 'react-test-renderer';
    import Message from './../../src/components/Message';
    
    const defaults = {
      children: 'Hello World',
    };
    describe('Message component', () => {
      it('should render with defaults', () => {
        const component = renderer.create(
          <Message />,
        );
        const tree = component.toJSON();
        expect(tree.children[0]).toEqual(defaults.children);
        expect(tree).toMatchSnapshot();
      });
    
      it('should render with children: Hello World!!!', () => {
        const component = renderer.create(
          <Message>Hello World!!!</Message>,
        );
        const tree = component.toJSON();
        expect(tree.children[0]).toEqual('Hello World!!!');
        expect(tree).toMatchSnapshot();
      });
    
      it('should render with children: <p>Hello World!!!</p>', () => {
        const component = renderer.create(
          <Message><p>Hello World!!!</p></Message>,
        );
        const tree = component.toJSON();
        expect(tree.children[0].children[0]).toEqual('Hello World!!!');
        expect(tree).toMatchSnapshot();
      });
    
      it('should render with children: <ul><li>Hello</li><li>World!!!</li></ul>', () => {
        const component = renderer.create(
          <Message><ul><li>Hello</li><li>World!!!</li></ul></Message>,
        );
        const tree = component.toJSON();
        expect(tree.children[0].children[0].type).toEqual('li');
        expect(tree.children[0].children[1].type).toEqual('li');
        expect(tree.children[0].children[0].children[0]).toEqual('Hello');
        expect(tree.children[0].children[1].children[0]).toEqual('World!!!');
        expect(tree).toMatchSnapshot();
      });
    });

![Example1](screenshots/example1.png "Example1")

This makes for a simple unit tested hello world application with a button that toggles a message.

If we run `npm run dev` and goto [http://localhost:8080](http://localhost:8080) we will see the project running in development with hot reloading.

Making any changes in the project and saving the file will run lint and rebuild the app and reload the browser.

If you run `npm run test` it will run all the tests we created to test the application with `jest`. 

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
            <h2>Example 2 - <small>{`click ${this.props.numClicks} times to toggle`}</small></h2>
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
This value gets updated each time the user clicks the button, `toggle` is called, incrementing the value until it reaches `numClicks` and resets the value while alternating the `showMessage` value.

![Example2](screenshots/example2.png "Example2")

Let's add a test for `Example2`, create `test/example2.spec.js` file with this in it:

    import React from 'react';
    import renderer from 'react-test-renderer';
    
    import Example2 from '../src/example2';
    
    describe('Example2 snapshot', () => {
      it('should toggle Message after 3 clicks', () => {
        const component = renderer.create(
          <Example2 numClicks={3} />,
        );
        let tree = component.toJSON();
    
        tree.children[1].props.onClick();
        tree.children[1].props.onClick();
        tree.children[1].props.onClick();
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    
        tree.children[1].props.onClick();
        tree.children[1].props.onClick();
        tree.children[1].props.onClick();
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

As you can see both of the example tests are similar, `example1` makes a single click and compares the rendered output of the component to a snapshot and `example2` test clicks 3 times and compares the state to a snapshot.

We should update `src/app.js` to include the `Example2` we just created.

    import React from 'react';
    import Example1 from './example1';
    import Example2 from './example2';
    
    const App = () => {
      return (
        <div>
          <Example1 />
          <Example2 numClicks={3} />
        </div>
      );
    };
    
    module.exports = App;

In `App` we add `Example2` component with override for default propTypes `numClicks` value of 2 with the value of 3.

![Jest Running Tests](screenshots/jest-running-tests.png "Jest Running Tests")

---
### Install and configure karma

Let's install `karma` and all of its dependencies, to get it all working side-by-side with `jest`.

    npm install --save-dev karma istanbul babelify brfs browserify browserify-shim karma-babel-preprocessor watchify karma-browserify karma-jasmine karma-coverage karma-firefox-launcher karma-chrome-launcher react-addons-test-utils
    
We need to add `browserify-shim` object to `package.json` or we will get an error:

    "browserify-shim": {}
    
**Error**: Unable to find a browserify-shim config section in the package.json
    
Now lets configure `karma` by creating a file called `karma.conf.js` in the root of the project with this in it:

    module.exports = function (karma) {  // eslint-disable-line func-names
      karma.set({
    
        frameworks: ['browserify', 'jasmine'],
    
        files: [
          'src/**/*.spec.js',
        ],
    
        reporters: ['dots'],
    
        preprocessors: {
          'src/**/*.spec.js': ['babel', 'browserify', 'coverage'],
        },
    
        browsers: ['PhantomJS'],
    
        logLevel: karma.LOG_DEBUG,
    
        singleRun: true,
    
        browserify: {
          debug: true,
          transform: ['babelify', 'brfs', 'browserify-shim'],
        },
      });
    };

We are ready to start adding `jasmine` tests that will be run by `karma` to the `src/` folder located next to our source code.

Let's add a duplicate test like we have in `src/index.spec.js` we will have this same test in `test/` so that karma can test ReactDOM render being called too, like `jest`:

    import ReactDOM from 'react-dom';
    import expect from 'expect'; // eslint-disable-line import/no-extraneous-dependencies
    
    describe('index', () => {
      it('calls render', () => {
        const spy = expect.spyOn(ReactDOM, 'render');
        require('../src/index'); // eslint-disable-line global-require
        expect(spy).toHaveBeenCalled(); // eslint-disable-line no-unused-expressions
      });
    });

Create another test in `src/app.spec.js` having this code:

    import React from 'react';
    import ReactTestUtils from 'react-addons-test-utils'; // eslint-disable-line import/no-extraneous-dependencies
    
    import App from '../src/app';
    import Example1 from '../src/example1';
    import Example2 from '../src/example2';
    
    const Renderer = ReactTestUtils.createRenderer();
    
    describe('App', () => {
      it('should render example components', () => {
        Renderer.render(<App />);
        const result = Renderer.getRenderOutput();
    
        expect(result.type).toBe('div');
        expect(result.props.children).toEqual([
          <Example1 />,
          <Example2 numClicks={3} />,
        ]);
      });
    });
    
`src/example1.spec.js`:

    import React from 'react';
    import ReactTestUtils from 'react-addons-test-utils'; // eslint-disable-line import/no-extraneous-dependencies
    
    import Example1 from '../src/example1';
    import Button from '../src/components/Button';
    import Message from '../src/components/Message';
    
    const Renderer = ReactTestUtils.createRenderer();
    
    describe('Example1', () => {
      it('should render correctly', () => {
        Renderer.render(<Example1 />);
        const result = Renderer.getRenderOutput();
    
        expect(result.type).toBe('div');
        expect(result.props.children).toEqual([
          <h2>Example 1 - <small>click once to toggle</small></h2>,
          <Button onClick={result.props.children[1].props.onClick} text="Toggle message" />,
          <Message>Hello world!!!</Message>,
        ]);
      });
    });
    
`src/example2.spec.js`:

    import React from 'react';
    import ReactTestUtils from 'react-addons-test-utils'; // eslint-disable-line import/no-extraneous-dependencies
    
    import Example2 from '../src/example2';
    import Button from '../src/components/Button';
    import Message from '../src/components/Message';
    
    const Renderer = ReactTestUtils.createRenderer();
    
    describe('Example2', () => {
      it('should render correctly', () => {
        Renderer.render(<Example2 numClicks={3} />);
        const result = Renderer.getRenderOutput();
    
        expect(result.type).toBe('div');
        expect(result.props.children).toEqual([
          <h2>Example 2 - <small>click 3 times to toggle</small></h2>,
          <Button onClick={result.props.children[1].props.onClick} text="Toggle message" />,
          <Message>Hello world!!!</Message>,
        ]);
      });
    });
    
`src/components/Button.spec.js`:
    
    /* eslint-disable import/no-extraneous-dependencies */
    
    import React from 'react';
    import ReactTestUtils from 'react-addons-test-utils';
    import Button from './../../src/components/Button';
    
    const Renderer = ReactTestUtils.createRenderer();
    
    describe('Button component', () => {
      it('should have defaults', () => {
        Renderer.render(<Button />);
        const result = Renderer.getRenderOutput();
    
        expect(result.type).toBe('input');
        expect(result.props.type).toBe('submit');
        expect(result.props.value).toBe('Toggle');
        expect(result).toEqual(
          <input type="submit" value="Toggle" onClick={result.props.onClick} />,
        );
      });
      it('should have text: Toggle message', () => {
        Renderer.render(<Button text="Toggle message" />);
        const result = Renderer.getRenderOutput();
    
        expect(result.props.value).toBe('Toggle message');
        expect(result).toEqual(
          <input type="submit" value="Toggle message" onClick={result.props.onClick} />,
        );
      });
    
      it('should have a onClick callback returning "Button clicked!"', () => {
        function onClick() { return 'Button clicked!'; }
        Renderer.render(<Button onClick={onClick} />);
        const result = Renderer.getRenderOutput();
    
        expect(result.props.onClick).toBe(onClick);
        expect(result).toEqual(
          <input type="submit" value="Toggle" onClick={onClick} />,
        );
      });
    });

`src/components/Message.spec.js`:

    /* eslint-disable import/no-extraneous-dependencies */
    
    import React from 'react';
    import ReactTestUtils from 'react-addons-test-utils';
    import Message from './../../src/components/Message';
    
    const Renderer = ReactTestUtils.createRenderer();
    
    describe('Message component', () => {
      it('should have defaults', () => {
        Renderer.render(<Message />);
        const result = Renderer.getRenderOutput();
    
        expect(result.type).toBe('p');
        expect(result.props.children).toBe('Hello World');
        expect(result).toEqual(
          <p>Hello World</p>,
        );
      });
    
      it('should have children: Hello World!!!', () => {
        Renderer.render(<Message>Hello World!!!</Message>);
        const result = Renderer.getRenderOutput();
    
        expect(result.type).toBe('p');
        expect(result.props.children).toBe('Hello World!!!');
        expect(result).toEqual(
          <p>Hello World!!!</p>,
        );
      });
    
      it('should render with children: <p>Hello World!!!</p>', () => {
        Renderer.render(<Message><p>Hello World!!!</p></Message>);
        const result = Renderer.getRenderOutput();
    
        expect(result.type).toBe('p');
        expect(result.props.children.type).toBe('p');
        expect(result.props.children.props.children).toBe('Hello World!!!');
        expect(result).toEqual(
          <p><p>Hello World!!!</p></p>,
        );
      });
    
      it('should render with children: <ul><li>Hello</li><li>World!!!</li></ul>', () => {
        Renderer.render(<Message><ul><li>Hello</li><li>World!!!</li></ul></Message>);
        const result = Renderer.getRenderOutput();
    
        expect(result.type).toBe('p');
        expect(result.props.children.type).toBe('ul');
        expect(result.props.children.props.children[0].type).toBe('li');
        expect(result.props.children.props.children[1].type).toBe('li');
        expect(result.props.children.props.children[0].props.children).toBe('Hello');
        expect(result.props.children.props.children[1].props.children).toBe('World!!!');
        expect(result).toEqual(
          <p><ul><li>Hello</li><li>World!!!</li></ul></p>,
        );
      });
    });

With all the tests in place and `karma` configured with `jasmine`, `browserify`, `babelify` and `babel` we can update our `test` and `karma` `run-script` in `package.json` to be like this.

    "test": "./node_modules/karma/bin/karma start; ./node_modules/jest/bin/jest.js --collectCoverageFrom='[\"src/**/**/**/*.js\"]' --coverage --verbose --setupTestFrameworkScriptFile test/jest_helper.js",
    "karma": "npm run lint; ./node_modules/karma/bin/karma start --auto-watch --no-single-run",
    
Now when we run `npm run test` or `npm test` or `npm t` to run tests, `karma` will run the tests and then even if it fails `jest` will run tests, both will generate coverage into the `coverage/` directory when they run.

We can do `npm run karma` to execute `karma` for tests located in `src/`.
We can do `npm run jest` to execute `jest` for tests located in `test/`.

If we execute `npm run karma` we can open our browser to see the tests running a the browser [http://localhost:9876/](http://localhost:9876/).

![Karma Running Tests](screenshots/karma-running-tests.png "Karma Running Tests")

---
### Authentication with Google

Let's take our application to the next level by adding Google authentication. To do this we need to install `mongoose`, `passport`, `passport-google-oauth` and write some code.

    npm install --save passport passport-google-oauth mongoose

Add a new file `src/server/auth/index.js`:

    require('./google');

``

---
### Docker

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
    
    # Build and optimize react app
    RUN npm run build
    
    EXPOSE 8000
    
    CMD ["./node_modules/pm2/bin/pm2-docker", "start", "--auto-exit", "--env", "production", "process.yml"]

If we have `docker` installed, we can run `docker-compose up` and it will bring up the application running in a docker container.
As you can see, this file creates the app directory and copies `package.json` into the app directory, which is inside the container.
Then it installs the application dependencies with `npm install`, and copies all of the application source(Bundle) into the container.
Now run lint and test to check the quality fo the code, using our tests and eslint configuration we have in place. 
If these don't pass, then the app shouldn't run, the container should fail to come up because the application can't run. 
If all tests pass though, then the app is allowed to build, run and serve the files on port 8000, you can connect to it and access the app from your favorite browser.

It's no fun having a `Dockerfile` without having a `docker-compose.yml` file, so let's add one having these lines:

    version: "2"
    
    services:
      app:
        build:
          context: .
          dockerfile: Dockerfile.production
        ports:
          - '8000:8000'
        volumes:
          - .:/src/app

The `docker-compose.yml` file just simplifies the process of creating containers with `docker` by introducing the `docker-compose` command to do it.

With these files, in place we can now run `docker-compose up` and it will bring up the app, all tested and running, accessible from a browser on port 8000.
It's a good alternative in case you don't want to install all these libraries on your machine and have docker installed.

Add a new file `Dockerfile.testing` with these contents:

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

To get the tests to run in Docker, we have to run a selenium container .

We should add this to the `docker-compose.yml` file:

        test:
          build:
            context: .
            dockerfile: Dockerfile.testing
          environment:
            SELENIUM_HOST: http://selenium:4444/wd/hub
            TEST_SELENIUM: 'yes'
          depends_on:
            - phantomjs
        selenium:
          container_name: selenium
          image: selenium/hub
        phantomjs:
          image: selenium/node-phantomjs
          links:
            - selenium

[https://github.com/SeleniumHQ/docker-selenium](https://github.com/SeleniumHQ/docker-selenium)

The `docker-compose.yml` file should look like this after those changes:

    version: "2"
    
    services:
      app:
        build:
          context: .
          dockerfile: Dockerfile.production
        image: react-hello-world/app
        ports:
          - '8000:8000'
        volumes:
          - .:/src/app
      test:
        build:
          context: .
          dockerfile: Dockerfile.testing
        image: react-hello-world/test
        environment:
          SELENIUM_HOST: http://selenium:4444/wd/hub
          TEST_SELENIUM: 'yes'
        depends_on:
          - phantomjs
      selenium:
        container_name: selenium
        image: selenium/hub
      phantomjs:
        image: selenium/node-phantomjs
        links:
          - selenium
      mongo:
        build:
          context: .
          dockerfile: Dockerfile
        image: docker/mongo
        volumes:
          - ./mongo/data:/data/db
        ports:
          - "27017:27017"

You can run the test container in docker like this: `docker-compose up react-hello-world-test` or `npm run testing`
    
Ideally for production we would upload the application frontend files to Amazon S3 bucket and configure that bucket to host website. 

https://webpack.js.org/guides/production-build/

Let's add some `run-scripts` to our `package.json`:

    "production": "docker-compose rm -f; docker-compose build --no-cache app && docker-compose up app",
    "testing": "docker-compose rm -f; docker-compose build --no-cache test && docker-compose up test"

---
### Commands

With all said and done you should have these commands in `package.json` file:

    "build": "./node_modules/webpack/bin/webpack.js -p",
    "lint": "./node_modules/eslint/bin/eslint.js --ignore-path .gitignore .",
    "dev": "./node_modules/webpack-dev-server/bin/webpack-dev-server.js --content-base ./static",
    "test": "./node_modules/karma/bin/karma start; ./node_modules/jest/bin/jest.js --collectCoverageFrom='[\"src/**/**/**/*.js\"]' --coverage --verbose --setupTestFrameworkScriptFile test/jest_helper.js",
    "karma": "npm run lint; ./node_modules/karma/bin/karma start --auto-watch --no-single-run",
    "jest": "npm run lint; ./node_modules/jest/bin/jest.js --collectCoverageFrom='[\"src/**/**/**/*.js\"]' --coverage --setupTestFrameworkScriptFile test/jest_helper.js --watchAll --no-cache",
    "lint-and-test": "npm run lint; npm run test -- -u",
    "start": "./node_modules/pm2/bin/pm2 start --env production process.yml",
    "restart": "./node_modules/pm2/bin/pm2 restart react-hello-world",
    "stop": "./node_modules/pm2/bin/pm2 stop react-hello-world",
    "show": "./node_modules/pm2/bin/pm2 show react-hello-world",
    "kill": "./node_modules/pm2/bin/pm2 kill",
    "list": "./node_modules/pm2/bin/pm2 list",
    "monit": "./node_modules/pm2/bin/pm2 monit",
    "logs": "./node_modules/pm2/bin/pm2 logs",
    "production": "docker-compose rm -f; docker-compose build --no-cache app && docker-compose up app",
    "testing": "docker-compose rm -f; docker-compose build --no-cache test && docker-compose up test"
        

---
### Continuous Integration

At some point after starting working on the project, and adding some tests, you can goto https://travis-ci.org and add the project there, so it can run tests when you push your changes to git.

- https://app.codeship.com/projects/203832
- https://travis-ci.org/gxela/react-hello-world
- https://circleci.com/gh/gxela/react-hello-world
- https://coveralls.io/github/gxela/react-hello-world
- https://app.shippable.com/projects/58ad0a23a0f1360f009ffd50
- https://scrutinizer-ci.com/g/gxela/react-hello-world/
- http://shields.io/ for more badges to add to your projects.
    
Once we added our project to `travis-ci.org` We can add a `.travis.yml` file in the root of our project, it will tell what kind of version of `node.js` to install, what to configure before running the tests and what command to run to execute the actual tests.

    language: node_js
    node_js:
      - "6.9.5"
      - "7.5.0"
    script: 'npm run lint-and-test'
    before_install:
      - "export DISPLAY=:99.0"
      - "sh -e /etc/init.d/xvfb start"
      
This will run `lint-and-test` on `node.js` version `6.9.5` and version `7.5.0`

https://docs.travis-ci.com/user/gui-and-headless-browsers/
https://documentation.codeship.com/pro/continuous-integration/browser-testing/

To run our tests on `codeship.com` we need to add two files, a `codeship-services.yml` and a `codeship-steps.yml`:

`codeship-services.yml`:

    app:
      build:
        image: app
        dockerfile_path: ./Dockerfile.production
      cached: false
      environment:
        NODE_ENV: 'production'
    
    test:
      build:
        image: test
        dockerfile_path: ./Dockerfile.testing
      cached: false
      environment:
        NODE_ENV: 'test'

`codeship-steps.yml`:

    - type: parallel
      steps:
        - service: app
          command: npm run start
        - service: test
          command: npm run lint-and-test
    
The above files will run both docker containers in parallel when we run `jet steps` locally. If we want to run production container by itself, we can do `jet run react_hello_world_production`.

https://documentation.codeship.com/pro/getting-started/installation/

To configure https://scrutinizer-ci.com/docs/build/code_coverage, lets add   `.scrutinizer.yml` file:

    checks:
      javascript: true
    filter:
      excluded_paths:
        - test/*
    build:
      tests:
        override:
          -
            command: 'npm run lint-and-test'
            coverage:
              file: 'coverage/clover.xml'
              format: 'clover'

---
### The Project

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

#### Day 4
Have a go at setting up a simple app using http://expressjs.com/

Here's what I'd like to see:

- start the app with `npm start` (add a `start` script to `package.json`)
- run the express app on port 8000
- the express app should be able to serve static files (eg. css, js, images), as well as a landing page (eg. `http://localhost:8000`)

**Bonus round**: we want users to be able to login, using their google account.

---
### Rationale

#### Code

To have a application that renders a button a message and keeps state for message shown or hidden.

1. Using `webpack` to prepare code and resources to serve to the browser, `index.html` uses he prepared `bundle.js` file.
2. Keep `src/index.js` as a thin wrapper to load the application into the root dom node, could then use other wrappers to load the application in different dom node.
3. The `src/app.js` application keeps a boolean state for `showMessage` variable used to show or hide the `Message` component, and defines a `toggle` method which sets the variable to true if false and false if true, updating the state. [stackoverflow/questions/24502898/show-or-hide-element](http://stackoverflow.com/questions/24502898/show-or-hide-element#24534492)
4. Bind the `toggle` method to `onClick` event, since the browser sends a event on button click, when that event fires, the `showMessage` variable is toggled.
5. Define the `Button` component and `Message` component as stateless, since there is no need for them to keep state because the parent component already does that with `showMessage`.
6. `Button` and `Message` both have defaultProps in case the developer doesn't pass in a text property, wanting to use a default value.

#### Tools

Since we are building a ReactJS application with ES6, we want to use WebPack to bundle the source code. We are trying to create a workflow that covers all the uses cases and allows us to produce a production ready application, to do this we want to make sure we tests everything, and to have separate environments, one for development, one for testing and one for production.
 
For production all we need is to run all tests and bundle the project code. Then upload it to a server that runs this project.

For development we want it all, run the lint and tests as we make changes and bundle the code and serve it in a browser with hot reloading.

For testing we have a lot of different options. For this project we are using two test runners, `jest` and `karma`. Our tests use `jasmine` to describe and define our tests and we use `expect` to assert results in the body of the defined tests. 

`jest` recommends that we use a `test()` function to write our tests, like this:

    test('adds 1 + 2 to equal 3', () => {
      expect(sum(1, 2)).toBe(3);
    });
    
But we use `describe(it())` instead because both work and `describe` hierarchy looks prettier. This is only in `jest`, in `karma` the below works.

    describe('Sum', () => {
      it('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
      });
    });



For this project we are using `jest` with snapshots functionality and all the snapshots tests are located in `test/__snapshots__/` directory. When you run the tests, the snapshots may get out of sync and you will need to update them, they will update when you run `npm run lint-and-test` because it passes the `-u` param to `jest`. You can also run `npm run test -- -u` to run tests and update the snapshots for `jest` tests.

---
### Workflow

#### Run

To run the project, execute `npm run build`, to bundle the frontend code for the react app and then `npm start`, to start the application server on port `8000`.

Then execute `npm run logs -- --lines 30` to show the logs, passing a param to show 30 lines or `npm run list` to show the running application instances or `npm run show` to show a description of all the processes running the application.

To stop the server, execute `npm run stop` or execute `npm run restart` to refresh it or execute `npm run kill` to obliterate it.

To run it in docker, execute `npm run production`. This will build a docker image and run it as a container, starting the application server on port `8000`.

In either case, once the application server is running, open your favorite browser pointing to [http://localhost:8000/](http://localhost:8000/).

#### Develop

We can execute `npm run lint` or `npm run lint-and-test` during development process so `eslint` can guide us and help us to write better/prettier code.

When making updates to the frontend code(working on the React application), we run `npm run dev`, this command executes `webpack-dev-server --content-base ./static`(in the background) to compile the code and hot-reload the changes into the web browser. During this process `eslint` runs and you may see `eslint` errors in the terminal output.

When doing development we want to make sure to write tests in the `test/` and `src/` directories and execute `npm t` or `npm run jest` or `npm run karma` to run the tests.

- The rationale behind using React, is simple, React is awesome! ReactDOM is just a dependency so obviously we install it.
- WebPack simplifies our workflow by compiling our content for us. For this project we are trying to achieve everything without using Grunt or Gulp.

#### Test

- Tests specific to `jest` are located in `test/` directory. `jest` runs all tests in both `src/` and `test/` directories(runs our karma tests too).
- Tests specific to `karma` are located in `src/` directory, follow the source luke!

When making updates to tests, execute `npm run test`(to run both karma and jest), this command executes tests located in `test/` and `src/` directories and checks that all the use cases we have defined meet to our expected results. Coverage is generated(when `karma` and/or `jest` run) into `coverage/` directory.

---
### TODO

- Make it so when running `npm run dev` or `webpack-dev-server` it also runs tests on top of lint and transpiling etc.
