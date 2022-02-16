import axios from 'axios'
/**
 * @function 
 * @param {String} country nombre del país o ciudad para buscar su clima.
 * @param {Number} lat latitud del país o ciudad para buscar su clima.
 * @param {Number} long longitud del país o ciudad para buscar su clima.
 * @param {String} lang lenguaje en que se obtienen los datos, por defecto es español.
 * @return {Object} devuelve los datos del clima del país o ciudad ingresado.
*/
export const getWeather= async ({country,lat,long,lang='es'})=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const url = process.env.REACT_APP_URL_WEATHER_API
            const apiKey = process.env.REACT_APP_WEATHER_API_KEY
            const location = country ? country : `${lat},${long}`
            const response = await axios.get(`${url}${location}?unitGroup=metric&key=${apiKey}&lang=${lang}`)
            resolve(response.data) 
        }
        catch(error){
            reject(error)
        }
    })

    
   
}



