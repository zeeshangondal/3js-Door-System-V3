import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { ColorOptions } from './ColorOptionsData';

const ColorDropdown = ({ setChosenColor, chosenColor }) => {
  let obj = ColorOptions.find((color) => color.value === chosenColor);

  const handleSelect = (eventKey) => {
    const selectedColor = ColorOptions.find((color) => color.value === eventKey);
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

  const dropdownToggleStyles = {
    // borderColor: 'black', // Set the border color when selected
    backgroundColor: chosenColor,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle
        variant="success"
        id="color-dropdown"
        style={dropdownToggleStyles}
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
