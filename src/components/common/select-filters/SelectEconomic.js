import React, {useState, useEffect} from 'react';
import { getIndicatorCountries, getNationalStrategiesCountries } from '../../../api';
import Select from 'react-select'

const SelectEconomic = ({ handleSearch, handleSearch2, selectedCountry1, selectedCountry2, indicator, charts, literals}) => {

  const [selectCountry1,setSelectCountry1]= useState([]);
  const [selectCountry2,setSelectCountry2]= useState([]);
  const [selectedClient,setSelectedClient]= useState(selectedCountry1);
  const [selectedClient2,setSelectedClient2]= useState(selectedCountry2);
  const [isLoading,setIsLoading] = useState(true);
  const [defaultValue, setDefaultValue]=useState({})
  const [defaultValue2, setDefaultValue2]=useState({})
  
  // on Component initialization, gets the indicators for each of the selects
  useEffect(()=>{
    initCountryIndicators(selectedCountry1, selectedCountry2);
  },[selectedCountry1, selectedCountry2]);

  const initCountryIndicators = (country1, country2) => {
    try {
      if (charts) {
        getIndicatorCountries(charts, indicator, country2)
          .then((res) => {
            const data= res.resultset.find(element=> (element.code) == country1)
            if (data)
            {
              setDefaultValue({
                label: data.name,
                value: data.code
              })
              setIsLoading(false);
            }
            setSelectCountry1(res.resultset);
          });
        getIndicatorCountries(charts, indicator, country1)
          .then((res) => {
            const data= res.resultset.find(element=> (element.code) == country2)
            if (data) {
              setDefaultValue2({
                label: data.name,
                value: data.code
              })
            } else {
              setDefaultValue2({
                label: 'Country',
                value: null
              })
            }
            setSelectCountry2(res.resultset);
          })
      } else {
        getNationalStrategiesCountries(country1)
          .then((data) => {
            const countryData = data.resultset.find((element) => element.code == country2);
            if (countryData) {
              setDefaultValue2({ label: countryData.name, value: countryData.code })
            } else {
              setDefaultValue2({ label: 'Country', value: null })
            }
            setSelectCountry2(data.resultset);
            setIsLoading(false);
          })
        getNationalStrategiesCountries(country2)
          .then((data) => {
            const countryData = data.resultset.find((element) => element.code == country1);
            if (countryData) {
              setDefaultValue({ label: countryData.name, value: countryData.code})
              setIsLoading(false);
            }
            setSelectCountry1(data.resultset)
          })
      }
    } catch (error) {
      console.log('Error fetching indicator countries', error);
    } 
  }

  const getSelectIndicators1 = (country) => {
    try {
      if (charts) {
        getIndicatorCountries(charts, null, country)
        .then((data) => {
          
          setSelectCountry2(data.resultset);
        })
      } else {
        getNationalStrategiesCountries([country])
          .then((data) => {
            setSelectCountry2(data.resultset)
          })
      }
    } catch (error) {
      console.log('Error fetching selected country in Select box 1', error.message);
    }
  }

  const getSelectIndicators2 = (country) => {
    try {
      if (charts) {
        getIndicatorCountries(charts, null, country)
          .then((data) => {
            setSelectCountry1(data.resultset);
          })
      } else {
        getNationalStrategiesCountries([country])
          .then((data) => {
            setSelectCountry1(data.resultset)
          })
      }
    } catch (error) {
      console.log('Error fetching selected country in select box 2', error.message)
    }
  }

  
   const handleSelectChange = value => {
    /**
     * Gets the selected country from select box 1 and sends it on the callback,
     * it also updates the countries indicator on select box 2
     */
    setSelectedClient(value.value);
    const country = (value.value)
    getSelectIndicators1(country);
    handleSearch(country);
  }

  const handleSelectChange2 = value => {
    /**
     * Gets the selected country from select box 2 and sends it on the callback,
     * it also updates the countries indicator on select box 1
     */
    setSelectedClient2(value.value);
    const country = (value.value)
    getSelectIndicators2(country);
    handleSearch2(country);
  }

  if (!isLoading)
  {
    return (
      <div className="compare--block container">
        {/* FILTERS */}

          <ul className="compare--list">
            {/* 1ST COUNTRY FILTER */}
            <li>
              <label>{literals.L20609}</label>
              <Select
                onChange={handleSelectChange}
                value={defaultValue}
                className="select-component select2-container"
                isSearchable
                options={selectCountry1.map(item=>({label: item.name, value: item.code}))}
                getOptionLabel={option => `(${option.value}) ${option.label}`}
              />            
            </li>
            {/* 2ND COUNTRY FILTER */}
            <li>
              <label>{literals.L20610}</label>
              <Select
                onChange={handleSelectChange2}
                value={defaultValue2}
                className="select-component select2-container"
                isSearchable
                options={selectCountry2.map(item=>({label: item.name, value: item.code}))}
                getOptionLabel={option => option.value == null ? option.label :`(${option.value}) ${option.label}`}
              />          
            </li>
          </ul>

      </div>
    );
  }
  else
  {
    return null;
  }
}

export default SelectEconomic;