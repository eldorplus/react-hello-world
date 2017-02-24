import React from 'react';
import ReactTestUtils from 'react-addons-test-utils'; // eslint-disable-line import/no-extraneous-dependencies

import App from '../src/app';
import Example1 from '../src/example1';
import Example2 from '../src/example2';

const Renderer = ReactTestUtils.createRenderer();

describe('App', () => {
  it('should render example components', () => {
    Renderer.render(<App />);
    const result = Renderer.getRenderOutput();

    expect(result.type).toBe('div');
    expect(result.props.children).toEqual([
      <Example1 />,
      <Example2 numClicks={3} />,
    ]);
  });
});

