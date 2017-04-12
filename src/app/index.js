import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'react-cookie';
import T from 'i18n-react';
import axios from 'axios';
import App from './app';
import Error from './error';
import language from './language';

axios.get(`/locale?l=${language()}`)
  .then((res) => {
    T.setTexts(res.data);
    ReactDOM.render(<App />, document.querySelector('#root'));
  })
  .catch((err) => {
    ReactDOM.render(<Error {...err.response} />, document.querySelector('#root'));
  });

