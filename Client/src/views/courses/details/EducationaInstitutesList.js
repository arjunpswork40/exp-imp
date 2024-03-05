import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useLocation,useNavigate } from 'react-router-dom';

const Tables = () => {
  const location = useLocation();
  const { institueData, continent, countryId } = location.state || {};
  const navigate = useNavigate();
  console.log('from ed list =>',{institueData:institueData,continent: continent, countryId: countryId})

  const handleDetailsCreaetClick = async() => {
      navigate('/admin/courses/continents/educational-institutes/store', { state: { institueData: institueData, continent: continent, countryId: countryId  } });
  }
  const handleViewClick = async(id) => {
    console.log('id===>',id)
    navigate('/admin/courses/continents/educational-institutes/details', { state: { institueData: institueData, continent: continent, countryId: countryId, instituteId:id  } });
  }
  return (
    <CRow>

      <CCol xs={12}>
        <CCard className="mb-4">
        <CCardHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>React Table</strong>
              <small> Bordered tables</small>
            </div>
            <CButton color="primary" size="sm"onClick={handleDetailsCreaetClick}>Add Educational Institute</CButton>
        </CCardHeader>
          <CCardBody>

            <p className="text-body-secondary small">
              <a href="https://coreui.io/docs/utilities/borders#border-color">
                Border color utilities
              </a>{' '}
              can be added to change colors:
            </p>
              <CTable bordered borderColor="primary">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell color='success' scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell color='success' scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell color='success' scope="col">email</CTableHeaderCell>
                    <CTableHeaderCell color='success' scope="col">Location</CTableHeaderCell>
                    <CTableHeaderCell color='success' scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>

                  {institueData.map((institue,index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
                      <CTableDataCell>{institue.name}</CTableDataCell>
                      <CTableDataCell>{institue.email}</CTableDataCell>
                      <CTableDataCell>{institue.location}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="success" size="sm" style={{marginRight: '10px'}} onClick={() => handleViewClick(institue._id)} >View</CButton>
                        <CButton color="danger" size="sm">Delete</CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
          </CCardBody>
        </CCard>
      </CCol>

    </CRow>
  )
}

export default Tables
