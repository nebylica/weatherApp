import React from 'react';
import {BDiv, BH3, BP, Display3} from "bootstrap-4-react";

function CurrentWeather({cityName, dateBuilder, weather}) {
    return (
        <BDiv display='flex' flex='column' alignItems='center'>
            <BH3 text="secondary" mt='4' mb='1'>{cityName}</BH3>
            <BP text="secondary"><em>{dateBuilder(new Date())}</em></BP>
            <Display3 text='secondary' mt='2' mb='2'>{Math.round(weather.current.temp)}°C</Display3>
            <img src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt={weather.current.weather[0].icon}/>
            <BH3 text="secondary">{weather.current.weather[0].main}</BH3>
        </BDiv>
    );
}

export default CurrentWeather;