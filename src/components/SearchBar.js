import React from 'react';
import {Alert, BDiv, Button, Form, InputGroup} from "bootstrap-4-react";

function SearchBar({setShowSaved, search, setSearch, getCityLatLon, showSaved, savedCities}) {
    return (
        <BDiv>
            <InputGroup mt="5" w="100">
                <Form.Input onFocus={() => setShowSaved(true)} value={search} type="text" placeholder="Write city name ..."
                            onChange={e => setSearch(e.target.value)}/>
                <InputGroup.Append>
                    <Button secondary onClick={() => getCityLatLon(search)}>Search</Button>
                </InputGroup.Append>
            </InputGroup>
            {
                showSaved && (
                    <BDiv w="100">
                        {savedCities.length === 0 ?
                            <Alert secondary w="100" m='0'>You didn't save any city name yet.</Alert> :
                            savedCities.map((name, i) => (
                                <Alert key={i} secondary w="100" display='flex' justifyContent='between' alignItems='center'
                                       m='0'>
                                    <BDiv>{name}</BDiv>
                                    <Button secondary onClick={() => getCityLatLon(name)}>Refresh weather information</Button>
                                </Alert>
                            ))
                        }
                    </BDiv>
                )
            }
        </BDiv>
    )
}

export default SearchBar;