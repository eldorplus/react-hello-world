import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import T from 'i18n-react';

T.setTexts(require('./../locales/en.json'))

ReactDOM.render(<App />, document.querySelector('#root'));
