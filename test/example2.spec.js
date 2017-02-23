import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import Example2 from '../src/example2';
import Button from '../src/components/Button';
import Message from '../src/components/Message';

const Renderer = ReactTestUtils.createRenderer();

describe('Example2', () => {
  it('should render correctly', () => {
    Renderer.render(<Example2 numClicks={3} />);
    const result = Renderer.getRenderOutput();

    expect(result.type).toBe('div');
    expect(result.props.children).toEqual([
      <h2>Example 2 - <small>click 3 times to toggle</small></h2>,
      <Button onClick={result.props.children[1].props.onClick} text="Toggle message" />,
      <Message>Hello world!!!</Message>,
    ]);
  });
});

