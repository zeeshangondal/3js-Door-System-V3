import React, { useState, useEffect } from 'react';

const CircularImage = ({ size, glassType, label, onClick, textureValue, clickedTextureValue }) => {
  let isClicked = textureValue === clickedTextureValue;
  const [imagePath, setImagePath] = useState('');

  useEffect(() => {
    import(`../GlassPictures/${glassType}.jpg`)
      .then((image) => setImagePath(image.default))
      .catch((error) => console.error('Error loading image:', error));
  }, [glassType]);

  const imageStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${imagePath})`,
    boxShadow: isClicked
      ? '0 0 0 5px white, 0 0 0 6px black, 0 0 0 10px rgba(255, 255, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.1)' // Adjust the shadow size and color
      : '0 4px 8px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1)', // Adjust the shadow size and color
    cursor: 'pointer',
    position: 'relative',
  };

  const whiteBorderStyle = {
    position: 'absolute',
    content: '',
    width: 'calc(100% + 10px)', // Adjust the border size as needed
    height: 'calc(100% + 10px)', // Adjust the border size as needed
    borderRadius: '50%',
    border: '5px solid white', // Adjust the border size as needed
    boxSizing: 'border-box',
    top: '-5px',
    left: '-5px',
  };

  const labelStyle = {
    textAlign: 'center',
    marginTop: '2px', // Adjust as needed
    fontWeight: 'normal',
    fontSize: '12px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1vh' }}>
      <div style={imageStyle} onClick={onClick}>
        <div style={whiteBorderStyle}></div>
      </div>
      <small style={labelStyle}>{label}</small>
    </div>
  );
};

export default CircularImage;
