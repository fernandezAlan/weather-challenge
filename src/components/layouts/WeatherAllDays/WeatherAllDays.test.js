import { render, act, screen} from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import WeatherAllDays from "./WeatherAllDays";
import {WeatherContextProvider} from "../../../contexts/weatherContext";

test("should render weather information of one day", () => {
  const data = {
    parseDate: {
      month: "Febrero",
      dayOfTheWeek: "Miércoles",
      day: 16,
      year: 2022,
    },
    description: "Condiciones claras.",
    iconURL:
      "https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/clear-day.png",
    temp: 30.6,
    tempmin: 25,
    tempmax: 32,
    humidity: 60,
    windspeed: 7,
  };
  const location = ["América", "Argentina", "Buenos Aires"];

  act(()=>{
    render(
      <WeatherContextProvider>
        <WeatherAllDays data={data} location={location} classes={{}} />
      </WeatherContextProvider>
    );
  })

  screen.getByText(data.parseDate.dayOfTheWeek);
  screen.getByText(data.tempmin + "°");
  screen.getByText(data.tempmax + "°");
});
