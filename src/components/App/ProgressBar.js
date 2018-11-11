import React from 'react';
import Filler from './Filler';

const ProgressBar = (props) => {
  return (
    <div className="progress-bar">
      <Filler duration={props.duration}/>
    </div>
  )
};

export default ProgressBar;
