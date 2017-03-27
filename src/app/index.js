import React from 'react';
import ReactDOM from 'react-dom';
import T from 'i18n-react';
import App from './app';
import translation from './../locales/en.json';

try {
  T.setTexts(translation);
} catch (err) {
  throw new Error(err);
}

ReactDOM.render(<App />, document.querySelector('#root'));
