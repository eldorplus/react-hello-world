import React from 'react';
import renderer from 'react-test-renderer';

import Example1 from '../src/example1';

describe('Example 1 snapshot', () => {
  it('should toggle Message on each click', () => {
    const component = renderer.create(
      <Example1 />,
    );
    let tree = component.toJSON();

    tree.children[1].props.onClick();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    tree.children[1].props.onClick();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

