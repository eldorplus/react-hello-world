/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import renderer from 'react-test-renderer';
import Message from './Message';

const defaults = {
  children: 'Hello World',
};

test('Message with defaults', () => {
  const component = renderer.create(
    <Message />,
  );
  const tree = component.toJSON();
  expect(tree.children[0]).toEqual(defaults.children);
  expect(tree).toMatchSnapshot();
});

test('Message with children: Hello World!!!', () => {
  const component = renderer.create(
    <Message>Hello World!!!</Message>,
  );
  const tree = component.toJSON();
  expect(tree.children[0]).toEqual('Hello World!!!');
  expect(tree).toMatchSnapshot();
});

test('Message with children: <p>Hello World!!!</p>', () => {
  const component = renderer.create(
    <Message><p>Hello World!!!</p></Message>,
  );
  const tree = component.toJSON();
  expect(tree.children[0].children[0]).toEqual('Hello World!!!');
  expect(tree).toMatchSnapshot();
});

test('Message with children: <ul><li>Hello</li><li>World!!!</li></ul>', () => {
  const component = renderer.create(
    <Message><ul><li>Hello</li><li>World!!!</li></ul></Message>,
  );
  const tree = component.toJSON();
  expect(tree.children[0].children[0].type).toEqual('li');
  expect(tree.children[0].children[1].type).toEqual('li');
  expect(tree.children[0].children[0].children[0]).toEqual('Hello');
  expect(tree.children[0].children[1].children[0]).toEqual('World!!!');
  expect(tree).toMatchSnapshot();
});
