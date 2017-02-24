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
