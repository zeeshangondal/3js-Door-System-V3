// ToggleSwitch.js
import React from 'react';

const ToggleSwitch = ({ isOn, onToggle }) => {
  // Styles
  const toggleStyle = {
    container: {
      display: 'flex',
      justifyContent: isOn ? 'flex-end' : 'flex-start',
      backgroundColor: isOn ? '#1F2937' : 'lightgray',
      borderRadius: '20px',
      width: '50px',
      padding: '2px',
      cursor: 'pointer',
      transition: 'justify-content 0.5s ease-in-out, background-color 0.5s ease-in-out', // Added transition property
    },
    circle: {
      height: '20px',
      width: '20px',
      backgroundColor: 'white',
      borderRadius: '50%',
      transition: 'transform 0.3s ease-in-out', // Added transition property
      transform: `translateX(${isOn ? 'calc(100% - 20px)' : '0'})`,
    },
  };

  return (
    <div style={toggleStyle.container} onClick={onToggle}>
      <div style={toggleStyle.circle}></div>
    </div>
  );
};

export default ToggleSwitch;
