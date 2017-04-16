import React from 'react';
import Example1 from './example1';
import Example2 from './example2';
import Example3 from './example3';
import Example4 from './example4';
import Example5 from './example5';

const App = () => {
  return (
    <div>
      <Example1 />
      <Example2 numClicks={3} />
      <Example3 />
      <Example4 />
      <Example5 />
    </div>
  );
};

module.exports = App;
