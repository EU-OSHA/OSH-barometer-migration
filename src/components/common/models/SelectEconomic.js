import React, {useState, useEffect} from 'react';
import ReactHtmlParser from 'react-html-parser';





//import axios from 'axios'


 const SelectEconomic = (props)=> {
//------  Url Del servidor
  const url="http://89.0.4.28:8080/barometer-data-server/api/countries/getIndicatorCountries?chart=20089&chart=20010&chart=20011&chart=20013&chart=20087&chart=20014&chart=20088"
  const url1 = "http://89.0.4.28:8080/barometer-data-server/api/countries/getIndicatorCountries?chart=20089&chart=20010&chart=20011&chart=20013&chart=20087&chart=20014&chart=20088&country=AT"
  const { handleSearch } = props
  const { handleSearch2 } = props
  const [countri, setCountri]= useState([]);
  const [countrip, setCountrip]= useState([]);
  const [selectedClient,setSelectedClient]= useState("");
  const [selectedClient2,setSelectedClient2]= useState("");

  const initialState = {
    pais1: [],
    pais2: [],
    selecteUser: null,
  }
  //redux para dispara el estado
  // const [state, dispatch] = useReducer(UserReducer, initialState)
  

////-----  En caso de utilizar axios ----///
  // const fetchData = (()=>{
  //   axios.get(url)
  // .then((response)=>{
  //   console.log(response.data);
  //   setCountri({usuarios:response.data})
  // })
  // .catch((error)=>{
  //   console.log(error);
  // });
  // })


 useEffect(()=>{
  fetchData()
  fetchData2()
 },[])

 
    const fetchData = () =>{
      fetch(url)
      .then(response => response.json())
      .then(data => setCountri(data.resultset)); 
 
  }

   const fetchData2 = () =>{
    fetch(url1)
      .then(response => response.json())
      .then(data => setCountrip(data.resultset)); 
    //console.log(id+"2")
    //console.log(url1)
   }

   const fetchData3 = (pais1) =>{
    fetch(`${url}&country=${pais1}`)
    .then(response => response.json())
    .then(data => setCountrip(data.resultset)); 
      // console.log(id)
      // console.log(`${url}&country=${id}`)
     }

     const fetchData4 = (pais2) =>{
      fetch(`${url}&country=${pais2}`)
      .then(response => response.json())
      .then(data => setCountri(data.resultset)); 
        // console.log(id)
        // console.log(`${url}&country=${id}`)

       }


function handleSelectChange(event) {
  setSelectedClient(event.target.value);
  // id guardara el valor pais para cargar los datos del nuevo select
  const pais1 = (event.target.value)
  fetchData3(pais1)
   //console.log()
  // console.log(`Dentro del handleSelect1`,event.target.value);

  handleSearch(pais1);
  //console.log(`despues del handleSearch`,event.target.value)
   
}

function handleSelectChange2(event) {
  setSelectedClient2(event.target.value);
  const pais2 = (event.target.value)
  fetchData4(pais2)
  //handleSearch2()
  handleSearch2(pais2);
  //console.log(`en el handleSearch2 ${pais2}`)
  
  // console.log(id)
  // console.log(event.target.value);
}


  return (
   
    <div>
      
    <div className="compare--block container">
					{/* FILTERS */}
					<form className="compare--block--form">
						<ul className="compare--list">
							{/* 1ST COUNTRY FILTER */}
							
									
          <li>
        <label> DATA FOR</label>

         <select value={selectedClient} onChange={handleSelectChange} name="" className="select2-container select2-offscreen">
          {
        countri.map((item,id) =>(
        <option key={id} value={item.code}>
            ({item.code})  {item.name.toUpperCase()}
                </option>
      ))
          }
        </select> 
          </li>
          <li>
        <label> COMPARE WITH</label>

         <select value={selectedClient2} onChange={handleSelectChange2} name="" className="select2-container select2-offscreen">
         <option>COUNTRY</option>
          {
        countrip.map((pais,id) => (
          
        <option key={id} value={pais.code}>
                ({pais.code}) {pais.name.toUpperCase()}
                </option>
                ))
              }
        </select> 
        </li>
      </ul>
        </form>
        </div>
        {props.children}
    </div>
    
    
  
  );
}
export default SelectEconomic;