import React from 'react';
import './FormFieldSelect.css';

const formFieldSelect = (props) => {
  let headerClassName,
    headerFontColor,
    optionsFormFieldHeight,
    selectedOption;

  if (props.open) {
    headerClassName = "Header-FormFieldOpen";
    optionsFormFieldHeight = {
      height: props.options && props.options.length * 30 + "px",
      border: "1px solid #ffffff",
      borderTop: "none"
    };
  } else {
    headerClassName = "Header-FormFieldClosed";
    optionsFormFieldHeight = {height: '0px'};
  }

  if (props.value) {
    selectedOption = props.value;
    headerFontColor = {color: "#ffffff"};
  } else {
    selectedOption = props.placeholder;
  }
  
  return (
    <div className={props.className}>
      <div className={headerClassName} style={headerFontColor}>
        <div className="SelectedOption">
          {selectedOption}
          <span onClick={() => props.toggledFieldSelect(props.id)}>
            <div className="TopTriangle"><div>{String.fromCharCode(0x25B4)}</div></div>
            <div className="BottomTriangle"><div>{String.fromCharCode(0x25BE)}</div></div>
          </span>
        </div>
      </div>
      <div className="OptionsContainer">
        <div className="Options" style={optionsFormFieldHeight}>
          {props.options && props.options.map(option => {
            return (
              <div 
                key={option.name}
                className="Option"
                onClick={() => props.selected(option.name)}>
                {option.name}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default formFieldSelect;