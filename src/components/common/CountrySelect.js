import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const CountrySelect = props => {
    const history = useHistory();
    var countryOption = "";

    function countryChange (event) {
        // console.log('Arrives to countryChange', event);
        history.push({
            pathname: props.currentPath+event.target.value
        })
        
        props.handler(event);
    }

    if(props.country === undefined){
        countryOption = <option selected value="0" >COUNTRY</option>
    }

    return (

                <select id={props.id} onChange={countryChange} className="select2-container select2-offscreen" tabIndex="-1"
                    value={props.country}>
                        {countryOption}
                    {
                        props.countries.map((country, index) => (
                            <option key={index} value={country.code}>({country.code}) {country.name}</option>
                        ))
                    }
                </select>

    )
}

export default CountrySelect;