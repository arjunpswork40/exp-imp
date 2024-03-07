
import React, { useCallback, useEffect, useState } from 'react'
import Products from './Products/Products'
import Recommended from './Recommended/Recommended'
import css from "./Filter.module.css"
import Header from '../header/Header'
import Sidebar from './Sidebar/Sidebar'

import Card from '../Generals/Card'
import Footer from '../Footer/Footer'
import LandingController from '../../../controllers/Landing/LandingController'
import { useNavigate } from 'react-router-dom';

export default function Filter() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  console.log(selectedCategory)
  // const handleDetailsCreatClick = async(institueId) => {
  //   navigate('/educational-institutes-details', { state: { institueId: institueId, continent: styleDetails.value } });
  // }
  const navigate = useNavigate();

  const [ styleDetails, setStyleDetails] = useState({
    value:'Asia',style: {color:'black', backgroundColor:'white'},countryIds:['all']
  })
  const handleDetailsCreatClick = useCallback(async (instituteId) => {
    navigate(`/educational-institutes-details/${styleDetails.value}/${instituteId}`);
  },[navigate, styleDetails]);


  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const [instituteByCountry, setInstituteByCountry] = useState([]);

  // ----------- Radio Filtering -----------
  const [selectedCountryIds,setSelectedCountryIds] = useState([]);
  const handleChange = async (event) => {



    console.log('event.target.value=>',event.target.value)

    let countryIds = selectedCountryIds.length > 0  ? selectedCountryIds : (event.target.checked) ? selectedCountryIds.push('all') : []
    console.log(selectedCountryIds,countryIds,event.target.checked)
    let postData = {
      countryIds:selectedCountryIds,
      continent:sidebarData?.continent??'Asia'
    }

    if(event.target.checked) {

      if(!selectedCountryIds.includes(event.target.value)) {
        selectedCountryIds.push(event.target.value);
        postData.countryIds = selectedCountryIds
        setSelectedCountryIds(selectedCountryIds)
      }
    } else {
      const newIdArray = selectedCountryIds.filter(entry => entry !== event.target.value);
      postData.countryIds = newIdArray

      setSelectedCountryIds(newIdArray)
    }

    if(event.target.value === 'all') {
      let updatedStyleDetails = styleDetails;
      if(event.target.checked){
        updatedStyleDetails.countryIds.push('all');
        setStyleDetails(updatedStyleDetails)
      }
    }

    try{
      let result = await LandingController.fetchInstituteDetailsByCountryIdAndContinent(postData)

      if(result.success){
        let instituteData = [];
        if(result.data.length > 0) {
          instituteData = result.data.map((item,index)=> {
            return <div onClick={() => handleDetailsCreatClick(item._id)}  className="card-link" key={index}><Card
                  key={index}
                  img={item.titleImage ?? 'http://localhost:4000/public/assets/images/ang-blue1.png'}
                  title={item.name}
                  shortName={item.shortName}
                  state={item.state}
                  prevPrice='0'
                  newPrice='0'
                /></div>
          })
        }
        setInstituteByCountry(instituteData)
      }
    } catch(error){

    }
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let postData = {
          continent: 'Asia',
          countryIds: 'all'
        };

        const data = await LandingController.fetchCountryList('Africa');
        if (data.success) {
          let sideBarDetails = {
            data: data,
            continent: 'Africa'
          };
          // Update Sidebar component with the response data
          setSidebarData(sideBarDetails);
        }

        let result = await LandingController.fetchInstituteDetailsByCountryIdAndContinent(postData);
        if (result.success) {
          let instituteData = [];
          if (result.data.length > 0) {
            instituteData = result.data.map((item, index) => (
              <div onClick={() => handleDetailsCreatClick(item._id)} className="card-link" key={index}>
                <Card
                  key={index}
                  img={item.titleImage ?? 'http://localhost:4000/public/assets/images/ang-blue1.png'}
                  title={item.name}
                  shortName={item.shortName}
                  state={item.state}
                  prevPrice='0'
                  newPrice='0'
                />
              </div>
            ));
          }
          setInstituteByCountry(instituteData);
        }
      } catch (error) {
        // Handle errors appropriately
      }
    };

    fetchData();
  }, [handleDetailsCreatClick]);



  const [sidebarData, setSidebarData] = useState(null);
  const handleButtonClickT = async (continent) => {
    let updatedStyleDetails = styleDetails;
    updatedStyleDetails.value=continent
    setStyleDetails(updatedStyleDetails)
    console.log('Button clicked:', continent);

    try {
      const data = await LandingController.fetchCountryList(continent);
      if(data.success){
        let sideBarDetails = {
          data:data,
          continent:continent
        }
        // Update Sidebar component with the response data
        setSidebarData(sideBarDetails);
      }

      let postData = {
        continent: continent,
        countryIds: 'all'
      }

      let result = await LandingController.fetchInstituteDetailsByCountryIdAndContinent(postData);
      if(result.success){
        let instituteData = [];
        if(result.data.length > 0) {
          instituteData = result.data.map((item,index)=> {
            return <div className="card-link" onClick={() => handleDetailsCreatClick(item._id)} key={index}><Card
                  key={index}
                  img={item.titleImage ?? 'http://localhost:4000/public/assets/images/ang-blue1.png'}
                  title={item.name}
                  shortName={item.shortName}
                  state={item.state}
                  prevPrice='0'
                  newPrice='0'
                /></div>
          })
        }
        setInstituteByCountry(instituteData)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  return (
    <>
    <Header/>
    <div className={css.mainFilter}>
        <Sidebar styleDetails={styleDetails} handleChange={handleChange} data={sidebarData} query={query} handleInputChange={handleInputChange} />
        {/* <Navigation query={query} handleInputChange={handleInputChange} /> */}
        <Recommended styleDetails={styleDetails} onButtonClick={handleButtonClickT} />
        <Products result={instituteByCountry} handleDetailsCreatClick={handleDetailsCreatClick}/>
    </div>
    <Footer />
    </>
  )
}
