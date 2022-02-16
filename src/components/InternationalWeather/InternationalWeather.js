import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../../contexts/weatherContext";
import CountriesWeather from "../CountriesWeather/CountriesWeather";
import InputText from "../InputText/InputText";
import WeatherSelectedDay from "../layouts/WeatherSelectedDay/WeatherSelectedDay";
import Container from "../common/Container/Container";
import Spinner from "../common/Spinner/Spinner";
import classes from "./internationalWeather.module.css";
const InternationalWeather = ({ loading }) => {
  const weatherContext = useContext(WeatherContext);

  const countries = weatherContext.state.countryWeather.countries;
  const selectedCountry = weatherContext.state.countryWeather.selectedCountry;
  const selectedDay =
    selectedCountry.selectedDay || selectedCountry.currentConditions;
  const location = weatherContext.state.countryWeather.selectedCountry.location;
  const changeDisplay = {
    display: countries.length ? "flex" : "none",
  };

  return (
    <div className={classes.container}>
          {selectedDay ? (
            <WeatherSelectedDay data={selectedDay} location={location} />
          ) : !loading ? null : (
            <Spinner />
          )}
      <div className={classes.container_countries} style={changeDisplay}>
        {countries.map((country) => (
          <CountriesWeather
            key={country.address}
            country={country}
          />
        ))}
      </div>
    </div>
  );
};
export default InternationalWeather;
