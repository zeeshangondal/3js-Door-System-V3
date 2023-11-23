import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { ColorOptions } from './ColorOptionsData';

const ColorDropdown = ({ setChosenColor, chosenColor }) => {
  let obj= ColorOptions.find((color) => color.value === chosenColor);
  // console.log(chosenColor, obj)
  // const [tempColor,setTempColor]= React.useState({obj})

  const handleSelect = (eventKey) => {
    const selectedColor = ColorOptions.find((color) => color.value === eventKey);
    // setTempColor(selectedColor)
    setChosenColor(selectedColor.value);
  };

  const dropdownOptionStyles = {
    width: '60vh', // Set the same width as the main selector
    margin: '0px',
    padding: '0px',
    fontSize: '2vh',
    fontWeight: 'bold',
  };

  const dropdownMenuStyles = {
    maxHeight: '200px', // Set your desired max height
    overflowY: 'auto',
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle
        variant="success"
        id="color-dropdown"
        style={{
          backgroundColor: chosenColor,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>{obj.text}</span>
        <span style={{ marginLeft: 'auto' }}></span>
      </Dropdown.Toggle>
      <Dropdown.Menu style={dropdownMenuStyles}>
        {ColorOptions.map((color) => (
          <Dropdown.Item
            key={color.value}
            eventKey={color.value}
            active={chosenColor === color.value}
            style={dropdownOptionStyles}
          >
            <div style={{ backgroundColor: color.value, padding: '8px' }}>{color.text}</div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ColorDropdown;
