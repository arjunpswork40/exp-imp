import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
} from '@coreui/react'
import AuthService from '../../../services/Admin/Auth/AuthServices'
import AfricaController from '../../../controllers/Admin/Course/Continent/AfricaController';


const Cards = () => {
  const [data,setData] = useState([])
  const navigate = useNavigate();
  const token = AuthService.getAccessToken();

  const fetchData = async () => {
    let response = [];
    try{

      response = await AfricaController.fetchCountryList(token);
      console.log('response==>',response.data)
      localStorage.setItem('tokenStatus', response.data.tokenStatus);
      setData(response.data);
    } catch (error) {
      if (error.response) {
        console.log('Error Response:', error.response.data);
        console.log('Status Code:', error.response.status);
        navigate('/admin/login', { replace: true });
      } else if (error.request) {
        console.log('No response received:', error.request);
      } else {
        navigate('/admin/login', { replace: true });
        console.log('Error:', error.message);
      }
    }
  }

  useEffect(() => {
    fetchData()
  },[]);


  const handleDetailsClick = async(countryId) => {
    let response = [];
    try{
      response = await AfricaController.fetchInstituteDetailsByCountry(token,'Africa',countryId)
      console.log('from Africa =>',{continent: 'Africa', countryId: countryId})
      navigate('/admin/courses/continents/educational-institutes', { state: { institueData: response.data, continent: 'Africa', countryId: countryId } });

    } catch(error) {
      console.log('error on institute list fetch =-> ', error)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Countries</strong> <small>List</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Listed all countries under Africa.
            </p>

            {/* <DocsExample href="components/card"> */}
            <CRow>
              {data.map((country,index) => (
                 <CCol key={index} xs={4}>
                 <CCard style={{ width: '18rem', marginTop:'10px' }}>
                   <CCardImage orientation="top" src={country.imagePath} style={{height:'150px'}} />
                   <CCardBody>
                     <CCardTitle>{country.name}</CCardTitle>
                     <CCardText>
                     Asia is the largest continent in the world by both land area and population.
                     </CCardText>
                     <CButton color="primary"
                        onClick={() => handleDetailsClick(country._id)}
                      >
                       Details
                     </CButton>
                   </CCardBody>
                 </CCard>
               </CCol>
              ))}
            </CRow>
            {/* </DocsExample> */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Cards
