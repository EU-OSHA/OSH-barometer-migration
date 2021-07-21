import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

const UrlChanger = (props) => {
    const { selectCountry, selectCountry2, selectedByUser } = useSelector((state) => state.selectCountries)
    const history = useHistory();

    useEffect(() => {
        setUrl();
    }, [props.currentSplit, selectCountry, selectCountry2, props.lockedCountry]);

    const setUrl = () => {
        history.push({
            pathname: constructUrl()
        })
    }

    const constructUrl = () => {
        if (!selectedByUser && (selectCountry != "" && selectCountry2 != "")) {
            const newUrl = `${props.currentLocation}${props.currentSplit}/${selectCountry}/${selectCountry2}`
            return newUrl
        } else if (selectedByUser && (props.lockedCountry != "" && selectCountry2 != "")) {
            const newUrl = `${props.currentLocation}${props.currentSplit}/${props.lockedCountry}/${selectCountry2}`
            return newUrl
        } else {
            const newUrl = `${props.currentLocation}${props.currentSplit}`
            return newUrl
        }
    }

    return (
        null
    );
};

export default UrlChanger;