/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { expect as chaixpect } from 'chai';
import renderer from 'react-test-renderer';
import Button from './Button';

test('Button with defaults', () => {
  const component = renderer.create(
    <Button />,
  );
  const tree = component.toJSON();
  chaixpect(tree.props.value).to.be.eql('Toggle');
  expect(tree).toMatchSnapshot();
});

test('Button with text: Toggle message', () => {
  const component = renderer.create(
    <Button text="Toggle message" />,
  );
  const tree = component.toJSON();
  chaixpect(tree.props.value).to.be.eql('Toggle message');
  expect(tree).toMatchSnapshot();
});

test('Button with a onClick callback returning "Button clicked!"', () => {
  const component = renderer.create(
    <Button onClick={() => { return 'Button clicked!'; }} />,
  );
  const tree = component.toJSON();
  chaixpect(tree.props.onClick()).to.be.eql('Button clicked!');
  expect(tree).toMatchSnapshot();
});
