import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render,act,screen} from "@testing-library/react";
import Home from "./Home";
import App from "../../components/App/App";
import { BrowserRouter as Router, Routes, Route,MemoryRouter } from "react-router-dom";
import { WeatherContextProvider } from "../../contexts/weatherContext";
import { getWeatherAndSetInfo } from "../../utils";
import { getWeather } from "../../providers/weather";
import axios from "axios";

jest.mock("axios");

beforeEach(() => {
  axios.get.mockClear();
});
test("should render Home component ", async () => {
  const resolve = {
    data: {
      days: [],
    },
  };
  act(()=>{
    render(
      <WeatherContextProvider>
        <Router>
          <Home />
        </Router>
      </WeatherContextProvider>
    );
  })
  
  axios.get.mockResolvedValue(Promise.resolve(resolve));
  const responseMock = await getWeather({ country: "argentina" });
  expect(responseMock).toEqual({ days: [] });
  screen.getByText("PRONÓSTICO DEL TIEMPO");
  screen.getByText("Pronóstico Local");
  screen.getByText("Búsca el prónostico de cualquier ciudad o país");
});

test("should redirect to Error page ", async () => {
    act(() => {
         render(
          <WeatherContextProvider>
            <MemoryRouter>
              <App />
            </MemoryRouter>
          </WeatherContextProvider>
        );

    })
  screen.getByText("PRONÓSTICO DEL TIEMPO");
  screen.getByText("Pronóstico Local");
  screen.getByText("Búsca el prónostico de cualquier ciudad o país");

  axios.get.mockResolvedValue(Error);
  await getWeather({ country: "argentina" });

  screen.getByText(/ha ocurrido un error/i);
  screen.getByText(/Por favor revisa tu conexión a internet/i);
});
