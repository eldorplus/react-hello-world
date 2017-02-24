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
