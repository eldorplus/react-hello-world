import React from 'react';
import Example2 from '../src/example2';
import renderer from 'react-test-renderer';

test('Example2 toggles Message after 3 clicks', () => {
  const component = renderer.create(
    <Example2 numClicks={3} />
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
