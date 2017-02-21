import ReactDOM, { render } from 'react-dom';
import { expect } from 'chai';
import '../src/index';

describe('index', () => {
  it('calls render', () => {
    expect(ReactDOM, render).to.have.been.called; // eslint-disable-line no-unused-expressions
  });
});
