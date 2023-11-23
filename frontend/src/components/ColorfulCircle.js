import React from 'react';

const ColorfulCircle = ({ size, color, chosenColor , setColor}) => {
  let isClicked=chosenColor==color
  const style = {
    width: size,
    height: size,
    backgroundColor: color,
    borderRadius: '50%',
    boxShadow: isClicked ? '0 0 0 5px white, 0 0 0 6px black' : 'none',
    display: 'inline-block',
    margin:"1vh",
    cursor:"pointer"
  };

  return <div   style={style}  onClick={()=>setColor(color)}/>;
};

export default ColorfulCircle;
