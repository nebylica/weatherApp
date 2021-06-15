import { useState } from 'react';

import {BDiv, BH3} from "bootstrap-4-react";
import SearchBar from "./components/SearchBar";
import RadioSaveButtons from "./components/RadioSaveButtons";
import CurrentWeather from "./components/CurrentWeather";
import FiveDaysForecast from "./components/FiveDaysForecast";


const api = {
    key: "240b28edb94fe686b9b5a52518c3f049",
    base: "https://api.openweathermap.org/"}

function App() {

    const [search, setSearch] = useState('')
    const [weather, setWeather] = useState('')
    const [showCurrent, setShowCurrent] = useState(true)
    const [error, setError] = useState({
        error: false,
        msg: ''
    })
    const [cityName, setCityName] = useState('')
    const [showSaved, setShowSaved] =useState(false)
    const [savedCities, setSavedCities] = useState([])

    function getCityLatLon(city) {
        fetch(`${api.base}geo/1.0/direct?q=${city}&appid=${api.key}`)
            .then(res => res.json())
            .then(data => {
                setSearch('')
                setShowSaved(false)
                setError({
                    error: false,
                    msg: ''
                })
                setCityName(`${data[0].name}, ${data[0].country}`)
                getWeather(data[0].lat, data[0].lon)
            })
            .catch(() => {
                setError({
                    error: true,
                    msg: 'Please write correct city name.'
                })
            })
    }

    function getWeather(lat, lon) {
        fetch(`${api.base}data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${api.key}`)
            .then(res => res.json())
            .then(data => {
                setWeather(data)
            })
    }

    function deleteCity(name) {
        let cityArr = savedCities.filter(city => city !== name)
        setSavedCities(cityArr)
    }

    function dateBuilder(d) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let date = d.getDate()
        let month = months[d.getMonth()]
        let year = d.getFullYear()

        return `${date} ${month} ${year}`
    }

    return (
        <BDiv w="100" h='100' display='flex' justifyContent='center'>
            <BDiv w='50'>
                <SearchBar setShowSaved={setShowSaved}
                           search={search}
                           setSearch={setSearch}
                           getCityLatLon={getCityLatLon}
                           showSaved={showSaved}
                           savedCities={savedCities}/>
                {error.error ?
                    <BH3 text='danger' mt='5' display='flex' justifyContent='center'>{error.msg}</BH3>
                    :
                    weather !== '' && (
                        <BDiv display='flex' flex='column' alignItems='center' mt='5'>
                            <RadioSaveButtons setShowCurrent={setShowCurrent}
                                              savedCities={savedCities}
                                              cityName={cityName}
                                              deleteCity={deleteCity}
                                              setSavedCities={setSavedCities}/>
                            {showCurrent ?
                                <CurrentWeather cityName={cityName} dateBuilder={dateBuilder} weather={weather} /> :
                                <FiveDaysForecast cityName={cityName} dateBuilder={dateBuilder} weather={weather} />
                            }
                        </BDiv>
                    )}
            </BDiv>
        </BDiv>
    );
};


export default App;
