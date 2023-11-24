const ColorfulCircle = ({ size, color, chosenColor, setColor }) => {
  let isClicked = chosenColor === color;

  const style = {
    width: size,
    height: size,
    backgroundColor: color,
    borderRadius: '50%',
    boxShadow: isClicked
      ? '0 0 0 4px white, 0 0 0 6px rgba(0, 0, 0, 0.4)' // Adjust the shadow size and color
      : '0 9px 12px rgba(0, 0, 0, 0.3)', // Adjust the shadow size and color
    display: 'inline-block',
    margin: '1vh',
    cursor: 'pointer',
    position: 'relative',
  };

  const whiteBorderStyle = {
    position: 'absolute',
    content: '',
    width: 'calc(100% + 8px)', // Adjust the border size as needed
    height: 'calc(100% + 8px)', // Adjust the border size as needed
    borderRadius: '50%',
    border: '4px solid white', // Adjust the border size as needed
    boxSizing: 'border-box',
    top: '-4px',
    left: '-4px',
  };

  return (
    <div style={style} onClick={() => setColor(color)}>
      <div style={whiteBorderStyle}></div>
    </div>
  );
};

export default ColorfulCircle;
