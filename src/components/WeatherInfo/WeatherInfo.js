import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../../contexts/weatherContext";
import { parseDate, getTodayDate } from "../../utils";

import WeatherInfoPrincipal from "../layouts/WeatherSelectedDay/WeatherSelectedDay";
import WeatherInfoExtraDays from "../layouts/WeatherAllDays/WeatherAllDays";
const WeaterInfo = ({ data, type, size,location,action}) => {
  const weatherContext = useContext(WeatherContext);
  const [date, setDate] = useState(parseDate(data.datetime));

  return type === "principal" ? (
    <WeatherInfoPrincipal
      data={data}
      
      date={date}
      location={location}
    />
  ) : (
    <WeatherInfoExtraDays
      data={data}
      
      date={date}
      isCurrentConditions={data.datetime === getTodayDate()}
      dispatch={weatherContext.dispatch}
      size={size}
      action={action}
    />
  );
};

export default WeaterInfo;
