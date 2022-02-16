import React from "react";
import Value from "../../common/Value/Value";
import Container from "../../common/Container/Container";
import classes from "./weatherSelectedDay.module.css";
const WeatherSelectedDay = ({ data, location }) => {
  return (
    <section className={classes.data_container}>
      <section className={classes.location}>
        <span className={classes.location_city}>{location[2]}</span>
        <span className={classes.location_country}>{location[1]}</span>
      </section>
      <section className={classes.day}>
        <span>{data?.parseDate?.dayOfTheWeek}</span>-
        <span
          style={{ color: "gray" }}
        >{`${data?.parseDate?.day} de ${data?.parseDate?.month}`}</span>
      </section>
      <section className={classes.description}>
        <span>{data?.description}</span>
      </section>
      <div className={classes.weather_info_container}>
        <section className={classes.weather_info}>
          <div>
            <img src={data?.iconURL} alt="icon_weather" />
          </div>
          <div>
            <span className={classes.temp_actual} id='temperature_selected'>{`${data?.temp}°`}</span>
          </div>
        </section>
        <section className={classes.extra_data}>
          <Value label={"temp. max:"} value={` ${data?.tempmax}°`} />
          <Value label={"temp. min:"} value={` ${data?.tempmin}°`} />
          <Value label={"Humedad:"} value={` ${data?.humidity}%`} />
          <Value
            label={"viento:"}
            value={` ${data?.windspeed.toFixed(0)} km/h`}
          />
        </section>
      </div>
    </section>
  );
};

export default WeatherSelectedDay;
