import React from 'react';

const Content = (props) => {
  return (
    <div>
      <p>{props.part} {props.excercises}</p>
    </div>
  );
};

export default Content;