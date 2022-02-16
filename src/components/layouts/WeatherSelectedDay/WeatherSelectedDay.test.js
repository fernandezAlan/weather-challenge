import { render,act,screen} from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import WeatherSelectedDay from "./WeatherSelectedDay"

test('should render weather information',()=>{
    const data = {
        parseDate:{
            month:"Febrero",
            dayOfTheWeek:"Miércoles",
            day:16,
            year:2022
            },
            description:"Condiciones claras.",
            iconURL:"https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/clear-day.png",
            temp:30.6,
            tempmin:25,
            tempmax:32,
            humidity:60,
            windspeed:7
    }
    const location=['América','Argentina','Buenos Aires']
    act(()=>{
        render(<WeatherSelectedDay data={data} location={location}/>)
    })
    

    screen.getByText(data.description)
    screen.getByText(data.temp+'°')
    screen.getByText(data.tempmin+'°')
    screen.getByText(data.tempmax+'°')
    screen.getByText(data.humidity+'%')
    screen.getByText(data.windspeed+' km/h')

    screen.getByText(location[1])
    screen.getByText(location[2])

})

