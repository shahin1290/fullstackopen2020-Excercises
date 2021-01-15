import React from 'react';

export interface CoursePart {
  name: string;
  exerciseCount: number;
}

export interface ContentProps {
  courseParts: Array<CoursePart>
}

const Content: React.FC<ContentProps> = ({ courseParts }) => (
  <div>
    {courseParts.map(part => 
      <p key={part.name}>
        {part.name} {part.exerciseCount}
      </p>
    )}
  </div>
);

export default Content;