import React from "react";
import { weatherReducer, weatherInitialState } from "./reducers/weatherReducer";
export const WeatherContext = React.createContext();

export const WeatherContextProvider = ({ children, defaultState }) => {
  const [state, dispatch] = React.useReducer(
    weatherReducer,
    weatherInitialState
  );
  const value = {
      state: defaultState ? defaultState : state,
      dispatch 
    };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

export const WeatherContextConsumer = WeatherContext.Consumer;
