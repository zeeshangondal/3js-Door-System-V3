// ToggleSwitch.js
import React from 'react';

const ToggleSwitch = ({ isOn, onToggle }) => {
    // Styles
    const toggleStyle = {
        container: {
            display: 'flex',
            justifyContent: isOn ? 'flex-end' : 'flex-start',
            backgroundColor:  isOn ?'#1F2937': 'lightgray',
            borderRadius: '20px',
            width: '50px',
            padding: '2px',
            cursor: 'pointer',
        },
        circle: {
            height: '20px',
            width: '20px',
            backgroundColor: 'white',
            borderRadius: '50%',
        },
    };

    return (
        <div style={toggleStyle.container} onClick={onToggle}>
            <div style={toggleStyle.circle}></div>
        </div>
    );
};

export default ToggleSwitch;
