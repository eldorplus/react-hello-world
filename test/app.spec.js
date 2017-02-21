import React from 'react';
import App from '../src/app';
import renderer from 'react-test-renderer';

test('App renders components', () => {
  const component = renderer.create(
    <App />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
