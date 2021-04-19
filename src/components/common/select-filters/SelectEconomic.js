import React, {useState, useEffect} from 'react';
import { getIndicatorCountries, getNationalStrategiesCountries } from '../../../api';
import AsyncSelect from 'react-select/async';
import Select from 'react-select'
import { data } from 'jquery';

 const SelectEconomic = ({ handleSearch, handleSearch2, selectedCountry1, selectedCountry2, indicator, charts, literals}) => {

  const [selectCountry1,setSelectCountry1]= useState([]);
  const [selectCountry2,setSelectCountry2]= useState([]);
  const [selectedClient,setSelectedClient]= useState(selectedCountry1);
  const [selectedClient2,setSelectedClient2]= useState(selectedCountry2);
  const [isLoading,setIsLoading] = useState(false);
  const [defaultValue, setDefaultValue]=useState(null)
  const [defaultValue2, setDefaultValue2]=useState(null)

  // on Component initialization, gets the indicators for each of the selects
  useEffect(()=>{
    initCountryIndicators(selectedCountry1, selectedCountry2);
  },[selectedCountry1, selectedCountry2]);

  const initCountryIndicators = (country1, country2) => {
    setIsLoading(true);
    try {
      if (charts) {
        getIndicatorCountries(charts, indicator, country2)
          .then((data) => {
            const datos= data.resultset.find(element=> (element.code) == country1)
           setDefaultValue({
             label: datos.name,
             value: datos.code
           })
           setSelectCountry1(data.resultset);
          });
        getIndicatorCountries(charts, indicator, country1)
          .then((data) => {
            const datos= data.resultset.find(element=> (element.code) == country2)
            if (datos) {
              setDefaultValue2({
                label: datos.name,
                value: datos.code
              })
            } else {
              setDefaultValue2({
                label: 'Country',
                value: null
              })
            }
            setSelectCountry2(data.resultset);
          })
      } else {
        getNationalStrategiesCountries([country1])
          .then((data) => {
            setSelectCountry2(data.resultset);
          })
        getNationalStrategiesCountries([country2])
          .then((data) => {
            setSelectCountry1(data.resultset)
          })
      }
    } catch (error) {
      console.log('Error fetching indicator countries', error);
    } finally {
      setIsLoading(false);
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
   
  // Early Return 
  if (isLoading) {
    return null;
  }

  return (
      <div className="compare--block container">
        {/* FILTERS */}
				<form className="compare--block--form">
					<ul className="compare--list">
						{/* 1ST COUNTRY FILTER */}
            <li>
              <label>{literals.L20609}</label>

              <Select
                  onChange={handleSelectChange}
                  // styles={customStyles}
                  value={defaultValue}
                  // label='single'
                  className="select-component select2-container"
                  // classNamePrefix="select"
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
                // styles={customStyles2}
                value={defaultValue2}
                className="select-component select2-container"
              // isClearable
                isSearchable
                options={selectCountry2.map(item=>({label: item.name, value: item.code}))}
                getOptionLabel={option => option.value == null ? option.label :`(${option.value}) ${option.label}`}
              />
             
            </li>
          </ul>
        </form>
      </div>
  );
}

export default SelectEconomic;