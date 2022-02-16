import React from "react";
import {checkMobile} from '../../../utils/index'
const Container = ({
  children,
  justifyContent,
  flexDirection,
  alignItems,
  alignContent,
  width,
  height,
  flexWrap,
  classes,
  className
}) => {
 
  const style = {
    display: "flex",
    width,
    justifyContent,
    flexDirection,
    alignItems,
    alignContent,
    height,
    flexWrap
  };
  return <div style={style} className={classes ? classes[className] : null}>{children}</div>;
};
export default Container;
