import React from "react";
import Container from "../../components/common/Container/Container";
import Button from "../../components/common/Button/Button";
import classes from "./error.module.css";
import warningLogo from "../../icon/warning.svg";
import { useNavigate } from "react-router-dom";
const Error = () => {
  let navigate = useNavigate();
  return (
    <Container justifyContent={"center"} alignItems={"center"} height={"100vh"}>
      <div className={classes.error_container}>
        <Container>
          <h3 style={{ margin: 10 }}>ha ocurrido un error</h3>
          <img src={warningLogo} />
        </Container>
        <Container
          flexDirection={"column"}
          alignItems={"center"}
          height={"80px"}
          justifyContent={"space-around"}
        >
          <span>Por favor revisa tu conexión a internet</span>
          <Button
            placeholder={"volver a intentar"}
            height={30}
            width={115}
            onClick={() => navigate("/")}
          />
        </Container>
      </div>
    </Container>
  );
};

export default Error;
