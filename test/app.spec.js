import React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/app';

test('App renders components', () => {
  const component = renderer.create(
    <App />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
