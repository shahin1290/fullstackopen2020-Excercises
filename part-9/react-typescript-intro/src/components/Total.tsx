import React from 'react';

export interface CoursePart {
  name: string;
  exerciseCount: number;
}

export interface TotalProps {
  courseParts: Array<CoursePart>;
}

const Total: React.FC<TotalProps> = ({ courseParts }) => (
  <div>
    <p>
      Number of exercises{' '}
      {courseParts.reduce((acc, curr) => acc + curr.exerciseCount, 0)}
    </p>
  </div>
);

export default Total;
