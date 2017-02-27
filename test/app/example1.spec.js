import React from 'react';
import ReactTestUtils from 'react-addons-test-utils'; // eslint-disable-line import/no-extraneous-dependencies

import Example1 from './../../src/app/example1';
import Button from './../../src/app/components/Button';
import Message from './../../src/app/components/Message';

const Renderer = ReactTestUtils.createRenderer();

describe('Example1', () => {
  it('should render correctly', () => {
    Renderer.render(<Example1 />);
    const result = Renderer.getRenderOutput();

    expect(result.type).toBe('div');
    expect(result.props.children).toEqual([
      <h2>Example 1 - <small>click once to toggle</small></h2>,
      <Button onClick={result.props.children[1].props.onClick} text="Toggle message" />,
      <Message>Hello world!!!</Message>,
    ]);
  });
});
