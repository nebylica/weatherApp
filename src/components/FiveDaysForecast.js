import React from 'react';
import {BDiv, BH3, BP} from "bootstrap-4-react";

function FiveDaysForecast({cityName, dateBuilder, weather}) {
    return (
        <BDiv display='flex' flex='column' alignItems='center'>
            <BH3 text="secondary" mt='4' mb='5'>{cityName}</BH3>
            <BDiv display='flex'>
                {weather.daily.map((w, i) => {
                    if(i < 5) {
                        return (
                            <BDiv key={i} display='secondary' flex='column' alignItems='center' m='2'>
                                <BDiv display='flex' flex='column' alignItems='center'>
                                    <BH3 text="secondary">{Math.round(w.temp.day)}°C</BH3>
                                    <BDiv display='flex'>
                                        <BP text='danger' mr='2'>{Math.round(w.temp.max)}°C</BP>
                                        <BP text='info'>{Math.round(w.temp.min)}°C</BP>
                                    </BDiv>
                                    <img src={`http://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`} alt={w.weather[0].icon}/>
                                    <BH3 text="secondary" mb='3'>{w.weather[0].main}</BH3>
                                </BDiv>
                                <BP text="secondary"><em>{dateBuilder(new Date(w.dt * 1000))}</em></BP>
                            </BDiv>
                        )
                    }
                })}
            </BDiv>
        </BDiv>
    );
}

export default FiveDaysForecast;