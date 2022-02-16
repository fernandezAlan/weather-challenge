import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { WeatherContextProvider } from "./contexts/weatherContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <WeatherContextProvider>
    <Router>
      <Routes>
      <Route path="/" element={<App/>} />
      </Routes>
    </Router>
    </WeatherContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
