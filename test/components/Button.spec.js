/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import renderer from 'react-test-renderer';
import Button from './../../src/components/Button';

describe('Button component snapshot', () => {
  it('should render with defaults', () => {
    const component = renderer.create(
      <Button />,
    );
    const tree = component.toJSON();
    expect(tree.props.value).toEqual('Toggle');
    expect(tree).toMatchSnapshot();
  });
  it('should render with text: Toggle message', () => {
    const component = renderer.create(
      <Button text="Toggle message" />,
    );
    const tree = component.toJSON();
    expect(tree.props.value).toEqual('Toggle message');
    expect(tree).toMatchSnapshot();
  });
  it('should have a onClick callback returning "Button clicked!"', () => {
    const component = renderer.create(
      <Button onClick={() => { return 'Button clicked!'; }} />,
    );
    const tree = component.toJSON();
    expect(tree.props.onClick()).toEqual('Button clicked!');
    expect(tree).toMatchSnapshot();
  });
});
