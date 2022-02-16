import React,{useContext} from "react";
import { selectDay } from "../../../utils";
import { WeatherContext } from "../../../contexts/weatherContext";
import Container from "../../common/Container/Container";
const WeatherAllDays = ({
  data,
  classes,
  isCurrentConditions,
  action,
}) => {
  const weatherContext = useContext(WeatherContext);
  const dispatch = weatherContext.dispatch
  return (
    <>
      <section
        id={`especific_day_weather_${data.datetime}`}
        className={classes.extra_data_container}
        onClick={() => selectDay({ day: data, dispatch, action })}
      >
        <section className={classes.day}>
          {isCurrentConditions ? "Hoy" : data?.parseDate?.dayOfTheWeek}
        </section>
        <Container alignItems="center">
          <section>
            <Container justifyContent="center">
              <img
                src={data?.iconURL}
                alt="icon_weather"
                style={{ width: "80%" }}
              />
            </Container>
            <Container justifyContent="center" flexDirection="column">
              <span className={classes.temp_max}>
                {`${data?.tempmax.toFixed(0)}°`}
              </span>
              <span className={classes.temp_min}>
                {`${data?.tempmin.toFixed(0)}°`}
              </span>
            </Container>
          </section>
        </Container>
      </section>
    </>
  );
};

export default WeatherAllDays;
