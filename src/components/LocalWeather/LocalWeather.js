import React, { useEffect, useContext, useState } from "react";
import { WeatherContext } from "../../contexts/weatherContext";
import { getWeatherAndSetInfo,getTodayDate } from "../../utils/index";
import WeatherSelectedDay from '../layouts/WeatherSelectedDay/WeatherSelectedDay'
import WeatherAllDays from '../layouts/WeatherAllDays/WeatherAllDays'
import Container from "../common/Container/Container";
import { ADD_LOCAL_SELECTED_DAY } from "../../config/constanst";
import classes from './localWeather.module.css'
import Spinner from "../common/Spinner/Spinner";
import { useNavigate  } from "react-router-dom";

const LocalWeather = () => {
  const weatherContext = useContext(WeatherContext);
  const localWeather = weatherContext?.state?.localWeather;
  const dispatch = weatherContext?.dispatch
  const selectedDay =
    localWeather?.selectedDay || localWeather?.currentConditions;
    let history = useNavigate();
  useEffect(() => {
    getWeatherAndSetInfo({dispatch,history});
  }, []);
  
  return (
    <div className={classes.container}>
      <Container justifyContent={'center'}>
        {selectedDay ? (
          <WeatherSelectedDay
            key={selectedDay.datetime + "principal"}
            data={selectedDay}
            location={weatherContext.state.localWeather.location}
            classes={classes}
          />
        ) : (
          <Spinner/>
        )}
      </Container>
      <div className={classes.all_days_container} id='all-days-container'>
        {localWeather?.allDays
          ? localWeather?.allDays.map((day) => (
              <WeatherAllDays
                key={day.datetime}
                data={day}
                action={ADD_LOCAL_SELECTED_DAY}
                dispatch={weatherContext.dispatch}
                isCurrentConditions={day.datetime === getTodayDate()}
                classes={classes}
              />
            ))
          : null}
      </div>
    </div>
  );
};
export default LocalWeather;
