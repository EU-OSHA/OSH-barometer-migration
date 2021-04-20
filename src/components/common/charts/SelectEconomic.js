// import React, {useState, useEffect} from 'react';
// import { getIndicatorCountries } from '../../../api';

//  const SelectEconomic = ({ handleSearch, handleSearch2, charts })=> {
//   const [countrySelect1, setCountrySelect1]= useState([]);
//   const [countrySelect2, setCountrySelect2]= useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedClient,setSelectedClient]= useState("");
//   const [selectedClient2,setSelectedClient2]= useState("");

//   /** Init for countries indicators */
//   useEffect(() => {
//     try {
//       setLoading(true);
//       getIndicatorCountries(charts)
//         .then((res) => {
//           setCountrySelect1(res.resultset);
//           setCountrySelect2(res.resultset);
//         })
//      } catch (error) {
//        console.log('Error fetching data: ', error)
//      } finally {
//        setLoading(false);
//      }
//   }, []);

// function handleSelectChange(event) {
//   setSelectedClient(event.target.value);
//   // id guardara el valor pais para cargar los datos del nuevo select
//   const pais1 = (event.target.value)
//   handleSearch(pais1);
// }

// function handleSelectChange2(event) {
//   setSelectedClient2(event.target.value);
//   const pais2 = (event.target.value)
//   handleSearch2(pais2);
// }

//   /** Early Return */
//   if (loading) {
//     return (
//       <div>
//         <p>Loading...</p>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <div className="compare--block container">
//             {/* FILTERS */}
//             <form className="compare--block--form">
//               <ul className="compare--list">
//                 {/* 1ST COUNTRY FILTER */}	
//             <li>
//           <label> DATA FOR</label>

//           <select value={selectedClient} onChange={handleSelectChange} name="" className=" select2-container select2-offscreen">
//             {
//           countrySelect1.map((item,id) =>(
//           <option key={id} value={item.code}>
//               ({item.code})  {item.name.toUpperCase()}
//                   </option>
//         ))
//             }
//           </select> 
//             </li>
//             <li>
//           <label> COMPARE WITH</label>

//           <select value={selectedClient2} onChange={handleSelectChange2} name="" className="select2-container select2-offscreen">
//           <option>COUNTRY</option>
//             {
//           countrySelect2.map((pais,id) => (
            
//           <option key={id} value={pais.code}>
//                   ({pais.code}) {pais.name.toUpperCase()}
//                   </option>
//                   ))
//                 }
//           </select> 
//           </li>
//         </ul>
//           </form>
//         </div>
//     </div>
//   );
// }
// export default SelectEconomic;