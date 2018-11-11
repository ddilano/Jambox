import React from 'react';

const Filler = (props) => {
  const animation = `fill ${props.duration}ms linear 100`;
  return (
    <div className="fill" style={{animation}}/>
  )
}

export default Filler
