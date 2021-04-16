import React, {useState, useEffect} from 'react';
import { getIndicatorCountries, getNationalStrategiesCountries } from '../../../api';
import AsyncSelect from 'react-select/async';
import Select from 'react-select'
import { data } from 'jquery';

 const SelectEconomic = ({ handleSearch, handleSearch2, selectedCountry1, selectedCountry2, indicator, charts, literals, countrySelect}) => {

  const [selectCountry1,setSelectCountry1]= useState([]);
  const [selectCountry2,setSelectCountry2]= useState([]);
  const [selectedClient,setSelectedClient]= useState(selectedCountry1);
  const [selectedClient2,setSelectedClient2]= useState(selectedCountry2);
  const [isLoading,setIsLoading] = useState(false);
  const [defaultValue,setDefaultValue]=useState(countrySelect)

  // on Component initialization, gets the indicators for each of the selects
  useEffect(()=>{
    initCountryIndicators();
  },[]);
//console.log(countrySelect)
  const initCountryIndicators = (country1, country2) => {
    setIsLoading(true);
    try {
      if (charts) {
        getIndicatorCountries(charts, indicator, country2)
          .then((data) => {
            const datos= data.resultset.find(element=> (element.code) == country1)
          //  setDefaultValue({
          //    label: datos.name,
          //    value: datos.code
          //  })
          // console.log(defaultValue)
           setSelectCountry1(data.resultset);
          });
        getIndicatorCountries(charts, indicator, country1)
          .then((data) => {
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
//console.log(defaultValue)


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

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: '300px',
      borderBottom: '1px dotted pink',
      color: 'black',
      padding: 20,
      display: 'flex'
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "#f6a400",
      fontSize: "21px",
      fontFamily:"Sans-serif",
      fontWeight: 700,
      textTransform:"uppercase"

    }) 
  }

  const customStyles2 = {
    menu: (provided, state) => ({
      ...provided,
      width: '300px',
      borderBottom: '1px dotted pink',
      color: 'black',
      padding: 20,
      display: 'flex'
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "#529FA2",
      fontSize: "21px",
      fontFamily:"Sans-serif",
      fontWeight: 700,
      textTransform:"uppercase"

    }) 
  }

    const customOptions = [
      {
        value: countrySelect,
        label: selectedCountry1,
      },
      {
        value: 'pririrnjnjdn',
        label: 'lslrems ms ccsc sjc  j sjdc zmc jac n ac kasc n',
      }
    ];
    
    
  // Early Return 
  if (isLoading) {
    return null;
  }

  return (
    <div>

      <div>
                  <Select
                  onChange={handleSelectChange}
                  styles={customStyles}
                  defaultValue={countrySelect}
                  label='single'
                  className="select2-container select2-offscreen"
                  classNamePrefix="select"
                  isSearchable
                  options={selectCountry1.map(item=>({label: item.name, value: item.code}))}
                  getOptionLabel={option => `(${option.value}) ${option.label}`}
                  
                  />

                <Select
                onChange={handleSelectChange2}
                styles={customStyles2}
                defaultValue={{ label: "COUNTRY", value: null }}
              // isClearable
                isSearchable
                options={selectCountry2.map(item=>({label: item.name, value: item.code}))}
                getOptionLabel={option => option.value == null ? option.label :`(${option.value}) ${option.label}`}
              />
      
        
      </div>
      <div className="compare--block container">
        {/* FILTERS */}
				<form className="compare--block--form">
					<ul className="compare--list">
						{/* 1ST COUNTRY FILTER */}
            <li>
              <label>{literals.L20609}</label>
              
            </li>
            
            
            {/* 2ND COUNTRY FILTER */}
            <li>
              <label>{literals.L20610}</label>
             
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default SelectEconomic;