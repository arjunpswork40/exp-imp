import React, { useEffect, useState, createRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from '../../../src/components'
import { DocsExample } from '../../../src/components'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton
} from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import EnqueryController from '../../controllers/Admin/Enquery/EnqueryController'
import AuthService from '../../services/Admin/Auth/AuthServices'
const Enquery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { continent } = location.state || {};
  console.log('continent==>',continent)
  const token = AuthService.getAccessToken();
  const [enqueryList, setEnqueryList] = useState([])
  const fetchEnqueryDetailsByInstitute = async (continent) => {
    try{
      const result = await EnqueryController.fetchEnqueryDetailsByInstitute(token,continent)
      if(result.success){
        setEnqueryList(result.data)
      }
    } catch(error) {
      if(error.statusCode === 401) {
        navigate('/admin/login', { replace: true });
      }
    }

  }

  const goToEnqueryDetails = (instituteId) => {
    try{
      navigate('/admin/enquery/details', { state: { continent: continent, instituteId: instituteId } });
    } catch(error) {
      console.log('error on institute list fetch =-> ', error)
    }
  }

  useEffect(() => {
    fetchEnqueryDetailsByInstitute(continent)
  },[continent])

  return (
    <>

          <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Table</strong> <small>Bordered tables</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Add <code>bordered</code> property for borders on all sides of the table and cells.
            </p>
            <DocsExample href="components/table#bordered-tables">
              <CTable bordered>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell color='success' scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell color='success' scope="col">Institute Name</CTableHeaderCell>
                    <CTableHeaderCell color='success' scope="col">Country</CTableHeaderCell>
                    <CTableHeaderCell color='success' scope="col">Number of Enqueries</CTableHeaderCell>
                    <CTableHeaderCell color='success' scope="col">Action</CTableHeaderCell>

                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {enqueryList && enqueryList.length > 0 ? (

                    enqueryList.map((item,index) => {
                      return(
                        <CTableRow className='text-center' key={index}>
                          <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
                          <CTableDataCell>{item.name}</CTableDataCell>
                          <CTableDataCell>{item.countryId.name}</CTableDataCell>
                          <CTableDataCell><b>{item.enqueries.length}{item.enqueries.length > 1 ? ' Enqueries' : ' Enquery'}</b></CTableDataCell>
                          <CTableDataCell>
                          <CButton component="a" color="success" href="#" role="button" onClick={() => goToEnqueryDetails(item._id)}>
                            View
                          </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      )

                    })

                  ) : (
                    <CTableRow className='text-center'>
                      <CTableHeaderCell colSpan="5">No enqueries found</CTableHeaderCell>

                    </CTableRow>
                  )}


                </CTableBody>
              </CTable>
            </DocsExample>

          </CCardBody>
        </CCard>
      </CCol>

    </>
  )
}

export default Enquery
