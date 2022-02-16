import React, { useEffect, useContext, useState } from "react";
import Container from "../../components/common/Container/Container";
import LocalWeather from "../../components/LocalWeather/LocalWeather";
import InternationalWeather from "../../components/InternationalWeather/InternationalWeather";
import InputText from "../../components/InputText/InputText";
import classes from "./home.module.css";

const Home = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <h1 className={classes.principal_tittle}>PRONÓSTICO DEL TIEMPO</h1>
      <div className={classes.principal_container}>
        <Container
          classes={classes}
          className={'container_local'}
          flexDirection={"column"}
          //width={"40vw"}
          alignItems={"center"}
        >
          <h4 className={classes.tittle_local}>Pronóstico Local</h4>
          <LocalWeather />
        </Container>
        <Container 
        flexDirection={"column"} 
        alignItems={"center"}
        className={'container_international'}
        classes={classes}
        >
          <h4 className={classes.tittle_int}>
            Búsca el prónostico de cualquier ciudad o país
          </h4>
          <Container alignItems="center" flexDirection={'column'}>
            <InputText setLoading={setLoading} />
          </Container>
          <InternationalWeather loading={loading}/>
        </Container>
      </div>
    </>
  );
};

export default Home;
