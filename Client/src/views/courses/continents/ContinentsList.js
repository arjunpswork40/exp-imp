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
            <strong>Continents</strong> <small>List</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Listed all continents here. You can go through each by clicking <b>&quot;Explore&quot;</b> button.
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
                    <CButton color="primary" href="/admin/courses/continents/Asia">
                      Explore
                    </CButton>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol xs={4}>
                <CCard style={{ width: '18rem', marginTop:'10px' }}>
                  <CCardImage orientation="top" src={Africa} style={{width:'200px', height:'200px', position:'relative', left:'15%', marginTop:'10px'}} />
                  <CCardBody>
                    <CCardTitle>Africa</CCardTitle>
                    <CCardText>
                    Africa is the world&apos;s second-largest and second-most populous continent, after Asia in both aspects
                    </CCardText>
                    <CButton color="primary" href="#">
                      Explore
                    </CButton>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol xs={4}>
                <CCard style={{ width: '18rem', marginTop:'10px' }}>
                  <CCardImage orientation="top" src={Europe} style={{width:'200px', height:'200px', position:'relative', left:'15%', marginTop:'10px'}} />
                  <CCardBody>
                    <CCardTitle>Europe</CCardTitle>
                    <CCardText>
                      Europe is a continent comprising the westernmost peninsulas of Eurasia.
                    </CCardText>
                    <CButton color="primary" href="#">
                      Explore
                    </CButton>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol xs={4}>
                <CCard style={{ width: '18rem', marginTop:'30px' }}>
                  <CCardImage orientation="top" src={NorthAmerica} style={{width:'200px', height:'200px', position:'relative', left:'15%', marginTop:'10px'}} />
                  <CCardBody>
                    <CCardTitle>North America</CCardTitle>
                    <CCardText>
                      North America covers an area of about 24,709,000 square kilometers (9,540,000 square miles)
                    </CCardText>
                    <CButton color="primary" href="#">
                      Explore
                    </CButton>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol xs={4}>
                <CCard style={{ width: '18rem', marginTop:'30px' }}>
                  <CCardImage orientation="top" src={SouthAmerica} style={{width:'200px', height:'200px', position:'relative', left:'15%', marginTop:'10px'}} />
                  <CCardBody>
                    <CCardTitle>South America</CCardTitle>
                    <CCardText>
                      South America is a continent entirely in the Western Hemisphere and mostly in the Southern Hemisphere.
                    </CCardText>
                    <CButton color="primary" href="#">
                      Explore
                    </CButton>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol xs={4}>
                <CCard style={{ width: '18rem', marginTop:'30px' }}>
                  <CCardImage orientation="top" src={Antarctica} style={{width:'200px', height:'200px', position:'relative', left:'15%', marginTop:'10px'}} />
                  <CCardBody>
                    <CCardTitle>Antarctica</CCardTitle>
                    <CCardText>
                      Antarctica is Earth&apos;s southernmost and least-populated continent.
                    </CCardText>
                    <CButton color="primary" href="#">
                      Explore
                    </CButton>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol xs={4}>
                <CCard style={{ width: '18rem', marginTop:'30px' }}>
                  <CCardImage orientation="top" src={Australia} style={{width:'200px', height:'200px', position:'relative', left:'15%', marginTop:'10px'}} />
                  <CCardBody>
                    <CCardTitle>Australia</CCardTitle>
                    <CCardText>
                      Australia, officially the Commonwealth of Australia, is a sovereign country.
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
