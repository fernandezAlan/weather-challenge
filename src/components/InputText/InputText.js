import React, { useEffect, useState, useContext } from "react";
import { getCountryWeather } from "../../utils";
import { WeatherContext } from "../../contexts/weatherContext";
import classes from "./InputText.module.css";
import Container from "../common/Container/Container";
import Button from "../common/Button/Button";

const InputText = ({ setLoading }) => {
  const [country, setCountry] = useState("");
  const [error, setError] = useState(false);
  const weatherContext = useContext(WeatherContext);
  const countries= weatherContext.state.countryWeather.countries
  return (
    <>
      <Container>
        <input
          type="text"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        />
        <Button
        placeholder={'buscar'}
          onClick={() =>
            getCountryWeather({
              country,
              dispatch: weatherContext.dispatch,
              countries,
              setLoading,
              setError,
            })
          }
        />
       
      </Container>
      {error ? (
        <Container flexDirection={"column"}>
          <span className={classes.error_info}>
            no se encontro el país o ciudad que estas buscando
          </span>
        </Container>
      ) : null}
    </>
  );
};

export default InputText;
