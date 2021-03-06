interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description?: string;
}

interface CoursePartOne extends CoursePartDescription {
  name: 'Fundamentals';
}

interface CoursePartTwo extends CoursePartDescription {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDescription {
  name: 'Deeper type usage';
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartDescription {
  name: 'Exhaustive type checking';
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;
