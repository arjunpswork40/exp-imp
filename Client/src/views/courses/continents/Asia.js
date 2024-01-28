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
import Asia from "../../../assets/country_flags/Asia/Flag_of_Armenia.svg.png"
import AuthService from '../../../services/Admin/Auth/AuthServices'
import AsiaController from '../../../controllers/Admin/Course/Continent/AsiaController'
const Cards = () => {
  const [data,setData] = useState([])
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = AuthService.getAccessToken();
    let response = [];
    try{

      response = await AsiaController.fetchCountryList(token);
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

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Countries</strong> <small>List</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Listed all countries under Asia.
            </p>

            {/* <DocsExample href="components/card"> */}
            <CRow>
              {data.map((country,index) => (
                 <CCol key={index} xs={4}>
                 <CCard style={{ width: '18rem', marginTop:'10px' }}>
                   <CCardImage orientation="top" src="http://localhost:4000/assets/images/ang-blue1.png" style={{width:'200px', height:'200px', position:'relative', left:'15%', marginTop:'10px'}} />
                   <CCardBody>
                     <CCardTitle>{country.name}</CCardTitle>
                     <CCardText>
                     Asia is the largest continent in the world by both land area and population.
                     </CCardText>
                     <CButton color="primary" href="#">
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
