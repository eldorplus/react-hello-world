import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import T from 'i18n-react';

try {
  T.setTexts(require('./../locales/en.json'))
} catch (err) {
  console.log(err)
}

ReactDOM.render(<App />, document.querySelector('#root'));
