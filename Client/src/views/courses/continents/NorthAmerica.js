import React from 'react'
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
import Africa from "../../../Landing/assets/africa.png"
import Asia from "../../../Landing/assets/asia.png"
import Australia from "../../../Landing/assets/Australia.png"
import SouthAmerica from "../../../Landing/assets/South_America.png"
import Antarctica from "../../../Landing/assets/Antarctica.png"
import Europe from "../../../Landing/assets/europe.png"
import NorthAmerica from "../../../Landing/assets/North_America.png"

import ReactImg from '../../../../src/assets/images/react.jpg'

const Cards = () => {
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
              <CCol xs={4}>
                <CCard style={{ width: '18rem', marginTop:'10px' }}>
                  <CCardImage orientation="top" src={Asia} style={{width:'200px', height:'200px', position:'relative', left:'15%', marginTop:'10px'}} />
                  <CCardBody>
                    <CCardTitle>Asia</CCardTitle>
                    <CCardText>
                    Asia is the largest continent in the world by both land area and population.
                    </CCardText>
                    <CButton color="primary" href="#">
                      Explore
                    </CButton>
                  </CCardBody>
                </CCard>
              </CCol>

              </CRow>
            {/* </DocsExample> */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Cards
