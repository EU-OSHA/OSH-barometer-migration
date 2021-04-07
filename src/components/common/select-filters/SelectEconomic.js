import React, {useState, useEffect} from 'react';
import { getIndicatorCountries } from '../../../api';

 const SelectEconomic = ({ handleSearch, handleSearch2, selectedCountry1, selectedCountry2, indicator, charts, literals }) => {
  const [selectCountry1, setSelectCountry1]= useState([]);
  const [selectCountry2, setSelectCountry2]= useState([]);
  const [selectedClient,setSelectedClient]= useState(selectedCountry1);
  const [selectedClient2,setSelectedClient2]= useState(selectedCountry2);
  const [isLoading, setIsLoading] = useState(false);

  // on Component initialization, gets the indicators for each of the selects
  useEffect(()=>{
    initCountryIndicators(selectedCountry1, selectedCountry2);
  }, []);

  const initCountryIndicators = (country1, country2) => {
    setIsLoading(true);
    try {
      getIndicatorCountries(charts, indicator, country2)
        .then((data) => {
          setSelectCountry1(data.resultset);
        });
      getIndicatorCountries(charts, indicator, country1)
        .then((data) => {
          setSelectCountry2(data.resultset);
        })
    } catch (error) {
      console.log('Error fetching indicator countries', error);
    } finally {
      setIsLoading(false);
    }
  }

  const getSelectIndicators1 = (country) => {
    try {
      getIndicatorCountries(charts, null, country)
        .then((data) => {
          setSelectCountry2(data.resultset);
        })
    } catch (error) {
      console.log('Error fetching selected country in Select box 1', error.message);
    }
  }

  const getSelectIndicators2 = (country) => {
    try {
      getIndicatorCountries(charts, null, country)
        .then((data) => {
          setSelectCountry1(data.resultset);
        })
    } catch (error) {
      console.log('Error fetching selected country in select box 2', error.message)
    }
  }

  function handleSelectChange(event) {
    /**
     * Gets the selected country from select box 1 and sends it on the callback,
     * it also updates the countries indicator on select box 2
     */
    setSelectedClient(event.target.value);
    const country = (event.target.value)
    getSelectIndicators1(country);
    handleSearch(country);
  }

  function handleSelectChange2(event) {
    /**
     * Gets the selected country from select box 2 and sends it on the callback,
     * it also updates the countries indicator on select box 1
     */
    setSelectedClient2(event.target.value);
    const country = (event.target.value)
    getSelectIndicators2(country);
    handleSearch2(country);
  }

  // Early Return 
  if (isLoading) {
    return null;
  }

  return (
    <div>
      <div className="compare--block container">
        {/* FILTERS */}
				<form className="compare--block--form">
					<ul className="compare--list">
						{/* 1ST COUNTRY FILTER */}
            <li>
              <label>{literals.L20609}</label>
              <select value={selectedClient} onChange={handleSelectChange} name="" className="select2-container select2-offscreen">
              {selectCountry1.map((country,id) =>(
                <option key={id} value={country.code}>
                  ({country.code})  {country.name.toUpperCase()}
                </option>
              ))}
              </select> 
            </li>
            {/* 2ND COUNTRY FILTER */}
            <li>
              <label>{literals.L20610}</label>
              <select value={selectedClient2} onChange={handleSelectChange2} name="" className="select2-container select2-offscreen">
              <option>{literals.L20630.toUpperCase()}</option>
              {selectCountry2.map((country,id) => (
                <option key={id} value={country.code}>
                  ({country.code}) {country.name.toUpperCase()}
                </option>
              ))}
              </select> 
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default SelectEconomic;