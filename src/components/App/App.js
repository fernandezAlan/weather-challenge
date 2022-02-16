import React from "react";
import Error from "../../views/Error/Error";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Home from "../../views/Home/Home";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/error" element={<Error />} />
      </Routes>
  );
};

export default App;
