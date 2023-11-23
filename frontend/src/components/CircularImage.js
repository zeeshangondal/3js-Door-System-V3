import React, { useState, useEffect } from 'react';

const CircularImage = ({ size, glassType, label ,onClick, textureValue,clickedTextureValue}) => {
  let isClicked=textureValue==clickedTextureValue
  const [imagePath, setImagePath] = useState('');

  useEffect(() => {
    import(`../GlassPictures/${glassType}.jpg`)
      .then(image => setImagePath(image.default))
      .catch(error => console.error('Error loading image:', error));
  }, [glassType]);

  const imageStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${imagePath})`,
    boxShadow: isClicked ? '0 0 0 5px white, 0 0 0 6px black' : 'none',
    cursor:'pointer'
  };

  const labelStyle = {
    textAlign: 'center',
    marginTop: '2px', // Adjust as needed
    fontWeight:"normal",
    fontSize:'12px'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin:'1vh' }}>
      <div style={imageStyle} onClick={onClick}/>
      <small style={labelStyle}>{label}</small>
    </div>
  );
};

export default CircularImage;
