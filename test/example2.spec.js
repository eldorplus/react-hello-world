import React from 'react';
import renderer from 'react-test-renderer';

import Example2 from '../src/example2';

describe('Example2 snapshot', () => {
  it('should toggle Message after 3 clicks', () => {
    const component = renderer.create(
      <Example2 numClicks={3} />,
    );
    let tree = component.toJSON();

    tree.children[1].props.onClick();
    tree.children[1].props.onClick();
    tree.children[1].props.onClick();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    tree.children[1].props.onClick();
    tree.children[1].props.onClick();
    tree.children[1].props.onClick();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
