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
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import EnqueryController from '../../controllers/Admin/Enquery/EnqueryController'
import AuthService from '../../services/Admin/Auth/AuthServices'
const EnqueryDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { continent, instituteId } = location.state || {};
  const token = AuthService.getAccessToken();
  const [enqueryDetails, setEnqueryDetails] = useState([])
  const fetchEnqueryDetails = async (continent) => {
    try{
      const result = await EnqueryController.fetchEnqueryDetails(token,continent,instituteId)
      if(result.success){
        setEnqueryDetails(result.data)
      }
    } catch(error) {
      if(error.statusCode === 401) {
        navigate('/admin/login', { replace: true });
      }
    }

  }

  useEffect(() => {
    fetchEnqueryDetails(continent)
  },[continent])

  return (
    <>
 <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Enquery Details - {enqueryDetails.name}</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              <b>Institute Phone :</b> {enqueryDetails.phone} <br></br> <b>Institue Email :</b> {enqueryDetails.email}
            </p>
            <DocsExample href="components/accordion">
              <CAccordion activeItemKey={1}>
                {enqueryDetails && enqueryDetails.enqueries?.length > 0 ? (
                  enqueryDetails.enqueries.map((item,index) => {
                    return (
                      <CAccordionItem key={index} itemKey={index+1}>
                      <CAccordionHeader>Submited by - {item.name}</CAccordionHeader>
                      <CAccordionBody>
                        <div style={{display: 'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:'16px'}}>
                          <div style={{padding:'0px',textAlign:'left'}}><b>Email : </b>{item.email}</div>
                          <div style={{padding:'16px',textAlign:'left'}}><b>Phone : </b>{item.phone}</div>
                        </div>
                        <div style={{display: 'grid',gridTemplateColumns:'repeat(1, 1fr)',gap:'16px',marginTop:'10px'}}>
                          <div><b>Message</b></div>
                          <div style={{border:'1px solid #ddd',padding:'16px',textAlign:'center'}}><strong>{item.message}</strong></div>
                        </div>
                      </CAccordionBody>
                    </CAccordionItem>
                    )
                  })
                ) : (
                  <p>No enqueries found</p>
                )}
              </CAccordion>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>


    </>
  )
}

export default EnqueryDetails
