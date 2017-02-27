/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import Message from './../../../src/app/components/Message';

const Renderer = ReactTestUtils.createRenderer();

describe('Message', () => {
  it('should have defaults', () => {
    Renderer.render(<Message />);
    const result = Renderer.getRenderOutput();

    expect(result.type).toBe('p');
    expect(result.props.children).toBe('Hello World');
    expect(result).toEqual(
      <p>Hello World</p>,
    );
  });

  it('should have children: Hello World!!!', () => {
    Renderer.render(<Message>Hello World!!!</Message>);
    const result = Renderer.getRenderOutput();

    expect(result.type).toBe('p');
    expect(result.props.children).toBe('Hello World!!!');
    expect(result).toEqual(
      <p>Hello World!!!</p>,
    );
  });

  it('should render with children: <p>Hello World!!!</p>', () => {
    Renderer.render(<Message><p>Hello World!!!</p></Message>);
    const result = Renderer.getRenderOutput();

    expect(result.type).toBe('p');
    expect(result.props.children.type).toBe('p');
    expect(result.props.children.props.children).toBe('Hello World!!!');
    expect(result).toEqual(
      <p><p>Hello World!!!</p></p>,
    );
  });

  it('should render with children: <ul><li>Hello</li><li>World!!!</li></ul>', () => {
    Renderer.render(<Message><ul><li>Hello</li><li>World!!!</li></ul></Message>);
    const result = Renderer.getRenderOutput();

    expect(result.type).toBe('p');
    expect(result.props.children.type).toBe('ul');
    expect(result.props.children.props.children[0].type).toBe('li');
    expect(result.props.children.props.children[1].type).toBe('li');
    expect(result.props.children.props.children[0].props.children).toBe('Hello');
    expect(result.props.children.props.children[1].props.children).toBe('World!!!');
    expect(result).toEqual(
      <p><ul><li>Hello</li><li>World!!!</li></ul></p>,
    );
  });
});
