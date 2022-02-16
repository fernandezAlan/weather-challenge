import React from "react";
import classes from "./button.module.css";
const Button = ({ placeholder, height, width,onClick}) => {
  const personalizedStyle = { height, width };
  return (
    <button className={classes.button} style={personalizedStyle} onClick={onClick}>
      {placeholder}
    </button>
  );
};
export default Button;
