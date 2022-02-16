import React from "react";

import classes from "./countryWeather.module.css";
import { ADD_COUNTRY_SELECTED_DAY } from "../../config/constanst";
import WeatherAllDays from "../layouts/WeatherAllDays/WeatherAllDays";
import Container from "../common/Container/Container";

const CountriesWeather = ({ country }) => {
  
  return (
    <section className={classes.container_country_weather}>
      <span>{country.resolvedAddress}</span>
      <Container>
        {country.days.map((day) => (
          <WeatherAllDays
            data={day}
            size={"small"}
            action={ADD_COUNTRY_SELECTED_DAY}
            classes={classes}
            key={day.datetime+'_'+country.address}
          />
        ))}
      </Container>
    </section>
  );
};

export default CountriesWeather;
