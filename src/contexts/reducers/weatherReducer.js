import { cloneDeep } from "lodash";
import { parseDate } from "../../utils";
import {
  ADD_COUNTRY_WEATHER,
  ADD_LOCAL_WEATHER,
  ADD_LOCAL_SELECTED_DAY,
  ADD_COUNTRY_SELECTED_DAY,
} from "../../config/constanst";

/**
 * estado inicial del contexto
 */

 export const weatherInitialState = {
    localWeather: {
      currentConditions: null,
      selectedDay: null,
      allDays: null,
      location: null,
    },
    countryWeather: {
      countries: [],
      selectedCountry: {
        selectedDay: null,
        currentConditions: null,
        allDays: null,
        location: null,
      },
    },
  };
  
  /*
   *reducer para cambiar el estado del contexto
   */
  export const weatherReducer = (state, action) => {
    switch (action.type) {
      case ADD_LOCAL_WEATHER:
        
        /**
         * aquí seteamos todos los datos del clima local
         */
        const localWeatherData = action.payload;
        /**
         * formateamos correctamente el string de timezone
         * para obtener un arreglo con los nombres del continente,país y su provincia,
         * reemplazamos todos los caracteres '_' por espacios en blanco ' '
         */
  
        const location = localWeatherData.timezone
          .split("/")
          .map((e) => e.replace("_", " "));
  
        /**
         * seteamos la temperatura mánima y máxima del día actual.
         * seteamos la fecha del día actual con el valor datetime.
         * seteamos la descripción del día actual
         */
        const currentConditions = localWeatherData.currentConditions;
        currentConditions.tempmin = localWeatherData.days[0].tempmin;
        currentConditions.tempmax = localWeatherData.days[0].tempmax;
        currentConditions.datetime = localWeatherData.days[0].datetime;
        currentConditions.description = localWeatherData.days[0].description;
        currentConditions.iconURL = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${currentConditions.icon}.png`;
        currentConditions.parseDate = parseDate(
          localWeatherData.days[0].datetime
        );
  
        /**
         * a cada día dentro del arreglo que los contiene le agregamos la propiedad 'parseData'
         * esta propiedad contiene un objeto con el nombre del día y del mes en español
         */
        localWeatherData.days.forEach((e) => {
          e.parseDate = parseDate(e.datetime);
          e.iconURL = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${e.icon}.png`;
        });
  
        /**
         * clonamos el estado actual y rellenamos el nuevo estado con los valores necesarios
         */
        const newState = cloneDeep(state);
        newState.localWeather.currentConditions = currentConditions;
        newState.localWeather.location = location;
        newState.localWeather.allDays = localWeatherData.days;
  
        return newState;
  
      case ADD_LOCAL_SELECTED_DAY:
        /**
         * cuando el usuario selecciona un día de los disponibles para ver el clima
         * aquí se seta el día seleccionado
         */
        
        const _state = cloneDeep(state);
        _state.localWeather.selectedDay = action.payload.selectedDay;
        console.log('ACTION DISPATCH ',_state)
        return _state;
  
      case ADD_COUNTRY_WEATHER:
        /**
         * aquí se seta el clima del país seleccionado
         */
        const countryState = cloneDeep(state);
        const countryWeatherData = action.payload.countryWeatherData;
        const countryLocation = countryWeatherData.timezone
          .split("/")
          .map((e) => e.replace("_", " "));
        const continent = countryLocation.shift();
        countryLocation.unshift(countryWeatherData.resolvedAddress);
        countryLocation.unshift(continent);
        countryWeatherData.days.length = 5;
        const CountryCurrentConditions = countryWeatherData.currentConditions;
        CountryCurrentConditions.tempmin = countryWeatherData.days[0].tempmin;
        CountryCurrentConditions.tempmax = countryWeatherData.days[0].tempmax;
        CountryCurrentConditions.datetime = countryWeatherData.days[0].datetime;
        CountryCurrentConditions.iconURL = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${CountryCurrentConditions.icon}.png`;
        CountryCurrentConditions.description =
          countryWeatherData.days[0].description;
  
        CountryCurrentConditions.parseDate = parseDate(
          countryWeatherData.days[0].datetime
        );
        const countries = countryState.countryWeather.countries;
        countryWeatherData.days.forEach((e) => {
          e.parseDate = parseDate(e.datetime);
          e.iconURL = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${e.icon}.png`;
          e.location = countryLocation;
        });
        if (countries.length < 5) {
          countries.unshift(countryWeatherData);
        } else {
          countries.pop();
          countries.unshift(countryWeatherData);
        }
  
        countryState.countryWeather.selectedCountry.currentConditions =
          countryWeatherData.days[0];
        countryState.countryWeather.selectedCountry.location = countryLocation;
        return countryState;
  
      case ADD_COUNTRY_SELECTED_DAY:
        const newCountry = action.payload.selectedDay;
        const copyState = cloneDeep(state);
        const selectedCountry = copyState.countryWeather.selectedCountry;
  
        selectedCountry.selectedDay = newCountry;
        selectedCountry.location = newCountry.location
       
        return copyState;
      default:
        throw new Error("reducer's type error");
        break;
    }
  };