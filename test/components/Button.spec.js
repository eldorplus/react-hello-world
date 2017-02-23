/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import Button from './../../src/components/Button';

const Renderer = ReactTestUtils.createRenderer();

describe('Button component', () => {
  it('should have defaults', () => {
    Renderer.render(<Button />);
    const result = Renderer.getRenderOutput();

    expect(result.type).toBe('input');
    expect(result.props.type).toBe('submit');
    expect(result.props.value).toBe('Toggle');
    expect(result).toEqual(
      <input type="submit" value="Toggle" onClick={result.props.onClick} />,
    );
  });
  it('should have text: Toggle message', () => {
    Renderer.render(<Button text="Toggle message" />);
    const result = Renderer.getRenderOutput();

    expect(result.props.value).toBe('Toggle message');
    expect(result).toEqual(
      <input type="submit" value="Toggle message" onClick={result.props.onClick} />,
    );
  });

  it('should have a onClick callback returning "Button clicked!"', () => {
    function onClick() { return 'Button clicked!'; }
    Renderer.render(<Button onClick={onClick} />);
    const result = Renderer.getRenderOutput();

    expect(result.props.onClick).toBe(onClick);
    expect(result).toEqual(
      <input type="submit" value="Toggle" onClick={onClick} />,
    );
  });
});
