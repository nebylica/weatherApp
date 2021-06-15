import React from 'react';
import {BDiv} from "bootstrap-4-react/lib/components/dom";
import {Button, ButtonGroup, Radio} from "bootstrap-4-react";

function RadioSaveButtons({setShowCurrent, savedCities, cityName, deleteCity, setSavedCities}) {
    return (
        <BDiv display='flex' flex='column' alignItems='center' >
            <ButtonGroup toggle>
                <Button secondary active as="label" onClick={() => setShowCurrent(true)}>
                    <Radio autoComplete="off" />
                    Current
                </Button>
                <Button secondary as="label" onClick={() => setShowCurrent(false)}>
                    <Radio autoComplete="off" />
                    5 days
                </Button>
            </ButtonGroup>
            {savedCities.includes(cityName) ?
                <Button secondary outline sm m='2' onClick={() => deleteCity(cityName)}>Delete city from saved</Button> :
                <Button secondary sm m='2' onClick={() => setSavedCities([...savedCities, cityName])}>Save city to list</Button>
            }
        </BDiv>
    );
}

export default RadioSaveButtons;