import ReactDOM from 'react-dom';
import expect from 'expect'; // eslint-disable-line import/no-extraneous-dependencies

describe('index', () => {
  it('calls render', () => {
    const spy = expect.spyOn(ReactDOM, 'render');
    require('../src/index'); // eslint-disable-line global-require
    expect(spy).toHaveBeenCalled(); // eslint-disable-line no-unused-expressions
  });
});
