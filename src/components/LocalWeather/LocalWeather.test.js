import { render, screen,act } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  WeatherContextProvider,
} from "../../contexts/weatherContext";
import LocalWeather from "./LocalWeather";
import { BrowserRouter as Router } from "react-router-dom";


const currentConditions = {
  description: "Condiciones claras.",
  iconURL:
    "https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/clear-day.png",
  temp: 30,
  tempmin: 20,
  tempmax: 32,
  humidity: 60,
  windspeed: 7,
};
const contextValue = {
  localWeather: {
    currentConditions: currentConditions,
    selectedDay: null,
    allDays: [],
    location: ["América", "Argentina", "Buenos Aires"],
  },
};

for (let i = 1; i <= 6; i++) {
  contextValue.localWeather.allDays.push(Object.assign({}, currentConditions));
  contextValue.localWeather.allDays[i - 1].temp += i;
  contextValue.localWeather.allDays[i - 1].tempmin += i;
  contextValue.localWeather.allDays[i - 1].tempmax += i;
  contextValue.localWeather.allDays[i - 1].datetime = "2022-02-0" + i;
}

let component;
describe("should render local weather", () => {
  
  
  beforeEach(() => {
     act(()=>{
       component= render(
            <WeatherContextProvider defaultState={contextValue}>
              <Router>
                <LocalWeather />
              </Router>
            </WeatherContextProvider>
          );
    })
  });

  it("should render all wather days", () => {
    const allDays = document.getElementById("all-days-container")
    expect(allDays.children.length).toBe(6);
    
  });

  it("should reder temperature and location from context", () => {
    screen.getByText(contextValue.localWeather.location[2]);
    screen.getByText(contextValue.localWeather.location[1]);
    screen.getByText(contextValue.localWeather.currentConditions.temp + "°");
  });

 
});
