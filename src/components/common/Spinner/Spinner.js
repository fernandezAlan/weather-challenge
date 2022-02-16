import React from "react";
import classes from "./spinner.module.css";
import Container from "../Container/Container";
const Spinner = () => {
  return (
    <Container
      width={440}
      height={200}
      justifyContent="center"
      alignItems="center"
    >
      <div className={classes.spinner}></div>
    </Container>
  );
};

export default Spinner;
