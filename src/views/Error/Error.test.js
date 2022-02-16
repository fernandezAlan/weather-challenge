import { fireEvent, render, act, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Error from "./Error";
import App from "../../components/App/App";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  MemoryRouter,
} from "react-router-dom";
import { WeatherContextProvider } from "../../contexts/weatherContext";

test("should render Error component ", async () => {
  act(() => {
   render(
      <Router>
        <Error />
      </Router>
  )
})

  screen.getByText(/ha ocurrido un error/i);
  screen.getByText(/Por favor revisa tu conexión a internet/i);
});

test("should redirect to Home ", async () => {
  
  act(()=>{
 render(
      <WeatherContextProvider>
      <MemoryRouter initialEntries={["/error"]}>
        <App />
      </MemoryRouter>
    </WeatherContextProvider>
  );
})

  const btn = screen.getByText(/volver a intentar/i);
  fireEvent.click(btn);
  screen.getByText(/PRONÓSTICO DEL TIEMPO/i);
});
