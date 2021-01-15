import React from 'react';
import { CoursePart } from '../types';

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => (
  <div>
    <h2>
      Number of exercises{' '}
      {courseParts.reduce((acc, curr) => acc + curr.exerciseCount, 0)}
    </h2>
  </div>
);

export default Total;
