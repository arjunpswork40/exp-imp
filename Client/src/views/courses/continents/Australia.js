import React, { useState, useEffect} from 'react'
import { Navigate,useNavigate } from 'react-router-dom';
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
import AustraliaController from '../../../controllers/Admin/Course/Continent/AustraliaController';
const Cards = () => {
  const [data,setData] = useState([])
  const navigate = useNavigate();
  const token = AuthService.getAccessToken();

  const fetchData = async () => {
    const token = AuthService.getAccessToken();
    let response = [];
    try{

      response = await AustraliaController.fetchCountryList(token);
      console.log('response==>',response)
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
      response = await AustraliaController.fetchInstituteDetailsByCountry(token,'Australia',countryId)
      navigate('/admin/courses/continents/educational-institutes', { state: { institueData: response.data, continent: 'Australia', countryId: countryId } });

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
              Listed all countries under Australia.
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
                     Australia, officially the Commonwealth of Australia, is a sovereign country.
                     </CCardText>
                     <CButton color="primary" onClick={() => handleDetailsClick(country._id)}>
                       Explore
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
