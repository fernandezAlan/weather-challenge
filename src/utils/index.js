import { getWeather } from "../providers/weather";
import { ADD_LOCAL_WEATHER, ADD_COUNTRY_WEATHER } from "../config/constanst";

/**
 * obtenemos las coordenadas actuales para enviarlas a la api.
 * @function
 * @return retorna un objeto con la latitud y longitud actual.
 */
export const getCoord = () => {
  return new Promise((resolve, reject) => {
    let lat;
    let long;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        resolve({ lat, long });
      });
    } else {
      reject("geolocation not found");
    }
  });
};

/**
 * @function
 * @param {Function} dispatch recibe el dispatch para enviar los datos al contexto una vez obtenidos.
 */
export const getWeatherAndSetInfo = async ({ dispatch, history }) => {
  try {
    const { lat, long } = await getCoord();
    const data = await getWeather({ lat, long });
    data.days.length = 6;
    dispatch({
      type: ADD_LOCAL_WEATHER,
      payload: data,
    });
  } catch (err) {
    console.error('error at getWeatherAndSetInfo:', err)
    history("/error");
  }
};

/**
 * @function
 * @param {String} date recibimos un string con la fecha con el formato yyyy-mm-dd.
 * @returns {Object} devolvemos un objeto con el dia y el mes actual en español.
 */
export const parseDate = (date) => {
  const parsedDate = new Date(date);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const days = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const month = months[parsedDate.getMonth()];
  const dayOfTheWeek = days[parsedDate.getDay()];
  const day = parsedDate.getDate() + 1;
  const year = parsedDate.getFullYear();
  return { month, dayOfTheWeek, day, year };
};

/**
 * @function
 * obtenemos la fecha actual con el formato yyyy-mm-dd.
 * @returns {String}
 */
export const getTodayDate = () => {
  let date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 10) {
    return `${year}-0${month}-${day}`;
  } else {
    return `${year}-${month}-${day}`;
  }
};

/**
 * @function
 * @param {Object} day objeto con el clima del día seleccionado por el usuario.
 * @param {Function} dispatch función para enviar el clima seleccionado al contexto.
 * @param {String} action el string con la acción para el dispatch.
 */
export const selectDay = ({ day, dispatch, action }) => {
  console.log('SELECT DAY', action)
  const payload = {
    selectedDay: day,
  };
  dispatch({
    type: action,
    payload: payload,
  });
};

/**
 * @function
 * @param {Object} country objeto con los datos del clima del país o ciudad seleccionada.
 * @param {Function} dispatch funcion dispatch para cambiar el contexto con los nuevos datos.
 * @param {Function} setLoading usamos esta funcion para activar o desactivar el spinner al momento de llamar a la api.
 * @param {Function} setError usamos esta funcion para activar el mensaje de error en caso de que ocurra algún error con la api.
 */
export const getCountryWeather = async ({
  country,
  dispatch,
  setLoading,
  setError,
  countries
}) => {
  if (country.length > 1) {
    try {
      setLoading(true);
      setError(false);
      /**
       * en repeat comprobamos que el país o ciudad que se este buscando
       *  no este ya guardado en el cotexto(para evitar repetir información)
       **/ 
      const repeat = countries.filter(e=>e.address===country)
      if(!repeat.length){
        const countryWeather = await getWeather({ country });
        dispatch({
          type: ADD_COUNTRY_WEATHER,
          payload: {
            countryWeatherData: countryWeather,
          },
        });
      }
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }
};

