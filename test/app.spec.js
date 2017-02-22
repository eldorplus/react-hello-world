import React from 'react';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-addons-test-utils';

import App from '../src/app';
import Example1 from '../src/example1';
import Example2 from '../src/example2';

const Renderer = ReactTestUtils.createRenderer();

test('App matches rendered snapshot', () => {
  const component = renderer.create(
    <App />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('App renders examples', () => {
  Renderer.render(<App />);
  const result = Renderer.getRenderOutput();

  expect(result.type).toBe('div');
  expect(result.props.children).toEqual([
    <Example1 />,
    <Example2 numClicks={3} />,
  ]);
});
