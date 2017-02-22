import React from 'react';
import Button from './Button';
import { expect as chaixpect } from 'chai';
import renderer from 'react-test-renderer';

test('Button with defaults', () => {
  const component = renderer.create(
    <Button />
  );
  let tree = component.toJSON();
  chaixpect(tree.props.value).to.be.eql('Toggle');
  expect(tree).toMatchSnapshot();
});

test('Button with defaults', () => {
  const component = renderer.create(
    <Button></Button>
  );
  let tree = component.toJSON();
  chaixpect(tree.props.value).to.be.eql('Toggle');
  expect(tree).toMatchSnapshot();
});

test('Button with text: Toggle message', () => {
  const component = renderer.create(
    <Button text="Toggle message"/>
  );
  let tree = component.toJSON();
  chaixpect(tree.props.value).to.be.eql('Toggle message');
  expect(tree).toMatchSnapshot();
});

test('Button with a onClick callback returning "Button clicked!"', () => {
  const component = renderer.create(
    <Button onClick={() => { return 'Button clicked!' }}/>
  );
  let tree = component.toJSON();
  chaixpect(tree.props.onClick()).to.be.eql('Button clicked!');
  expect(tree).toMatchSnapshot();
});