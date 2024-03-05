import React, { useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
  CNav,
} from '@coreui/react'
import { DocsExample } from '../../../../src/components'
import InstituteDetailsController from '../../../controllers/Admin/Course/Continent/InstituteDetailsController'
import AuthService from '../../../services/Admin/Auth/AuthServices'


const Validation = () => {
  const [validated, setValidated] = useState(false)
  const [backEndValidation, setBackEndValidation] = useState(false)
  const token = AuthService.getAccessToken();
  const navigate = useNavigate();
  const location = useLocation();
  const { institueData, continent, countryId } = location.state || {};
  console.log('institueData, continent, countryId===>',institueData, continent, countryId)
  const [areasOfStudy, setAreasOfStudy] = useState([
    {name: 'areaOfStudy-name',studentCount:'areaOfStudy-studentsCount',rating:'areaOfStudy-rating'}
  ]);
  const [areaOfStudyEntryCount,setAreaOfStudyEntryCount] = useState(1);
  const handleAreaOfStudyAddClick = () => {
    const updatedCount = parseInt(areaOfStudyEntryCount) + 1;
    setAreaOfStudyEntryCount(updatedCount);
    console.log(updatedCount);

    setAreasOfStudy((prevAreas) => [
      ...prevAreas,
      {
        name: `areaOfStudy-name-${updatedCount}`,
        studentCount: `areaOfStudy-studentsCount-${updatedCount}`,
        rating: `areaOfStudy-rating-${updatedCount}`,
      },
    ]);
  };


  const handleAreaOfStudyRemoveClick = () => {
    const updatedAreasOfStudy = areasOfStudy.slice(0,-1)

    setAreasOfStudy(updatedAreasOfStudy);
    setAreaOfStudyEntryCount((prevCount) => prevCount - 1);
  };


  const [teacherList, setTeacherList] = useState([
    {name:'teacherlist-nameOfTheTeacher',specializedIn:'teacherlist-specializedIn',experience:'teacherlist-expirence'}
  ])
  const [teacherListCount, setTeacherListCount] = useState(1);

  const handleTeacherListAddClick = () => {
    const updatedCount = parseInt(teacherListCount) + 1;
    setTeacherListCount(updatedCount);

    setTeacherList((prevAreas) => [
      ...prevAreas,
      {
        name: `teacherlist-nameOfTheTeacher-${updatedCount}`,
        specializedIn: `teacherlist-specializedIn-${updatedCount}`,
        experience: `teacherlist-expirence-${updatedCount}`,
      },
    ]);
  };


  const handleTeacherListRemoveClick = () => {
    const updatedTeacherList = teacherList.slice(0,-1)

    setTeacherList(updatedTeacherList);
    setTeacherListCount((prevCount) => prevCount - 1);
  };



  const [aminitiesList, setAminitiesList] = useState([
    {name:'aminitiesList-name',description:'aminitiesList-description'}
  ])
  const [aminitiesListtCount, setAminitiesListCount] = useState(1);

  const handleAminitiesListAddClick = () => {
    const updatedCount = parseInt(aminitiesListtCount) + 1;
    setAminitiesListCount(updatedCount);

    setAminitiesList((prevAreas) => [
      ...prevAreas,
      {
        name: `aminitiesList-name-${updatedCount}`,
        description: `aminitiesList-description-${updatedCount}`,
      },
    ]);
  };


  const handleAminitiesListRemoveClick = () => {
    const updatedAminitiesList = aminitiesList.slice(0,-1)

    setAminitiesList(updatedAminitiesList);
    setAminitiesListCount((prevCount) => prevCount - 1);
  };

  const [relatedVideosFilesForPostData, setRelatedVideosFilesForPostData] = useState([]);
  const [relatedDocumentsFilesForPostData, setRelatedDocumentsFilesForPostData] = useState([]);
  const [relatedImagesFilesForPostData, setRelatedImagesFilesForPostData] = useState([]);



  const handleRelatedDocumentsFileChange = (event) => {
    const selectedFiles = event.target.files;
    setRelatedDocumentsFilesForPostData(selectedFiles)
  };
  const handleRelatedVideosFileChange = (event) => {
    const selectedFiles = event.target.files;
    setRelatedVideosFilesForPostData(selectedFiles)
  };
  const handleRelatedImagesFileChange = (event) => {
    const selectedFiles = event.target.files;
    setRelatedImagesFilesForPostData(selectedFiles)
  };
  const handleSubmit = async (event) => {

    const form = event.target
    // console.log('event.currentTarget=>',event.currentTarget)
    console.log('file=>',event.target)
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault(); // Prevent default form submission
      setValidated(true);

      // Extract data from the form
      const formData = new FormData(form);
      console.log('relatedVideosFilesForPostData=>',typeof relatedVideosFilesForPostData)
      let relatedVideos = [];
      let relatedDocuments = [];
      let relatedImages = [];

      Object.values(relatedVideosFilesForPostData).forEach((file, index) => {
        relatedVideos.push(file)
      });
      Object.values(relatedDocumentsFilesForPostData).forEach((file, index) => {
        relatedDocuments.push(file)
      });
      Object.values(relatedImagesFilesForPostData).forEach((file, index) => {
        relatedImages.push(file)
      });
      console.log(formData,'<=formData')
      console.log('event=>',event)
      const postData = {};
      formData.forEach((value, key) => {
        if(key === 'relatedDocuments') {
          postData[key] = relatedDocuments;
        } else if(key === 'relatedImages') {
          postData[key] = relatedImages;
        } else if(key === 'relatedVideos') {
          postData[key] = relatedVideos;
        } else {
          postData[key] = value;
        }
      });
      postData['countryId'] = countryId;
      postData['continent'] = continent;
      let response = [];
      console.log(postData);
      try{
        response = await InstituteDetailsController.storeInstituteDetails(token,postData);
        console.log('response==>',response)
        localStorage.setItem('tokenStatus', response.data.tokenStatus);

      setRelatedVideosFilesForPostData([]);
      setRelatedDocumentsFilesForPostData([]);
      setRelatedImagesFilesForPostData([]);

        if(response.success){
          institueData.push(response.data)
          navigate('/admin/courses/continents/educational-institutes', { replace: true, state: {institueData: institueData,countryId:countryId,continent:continent} });
        }
      } catch(error) {
        console.log(error)
        if(error.statusCode === 400 ) {
          let errorDetails = []
          error.errors.forEach((err) => {
            errorDetails[err.param] = err.msg;
          });
          setBackEndValidation(errorDetails);
          console.log('backEndValidation =>', backEndValidation);
        }
        if(error.statusCode === 401) {
          navigate('/admin/login', { replace: true });
        }
      }

    }
    setValidated(true)
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Institute</strong> <small>Store Institue</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Store education details here.
            </p>
            <p className="text-body-secondary small">
              Under maintanace
            </p>
            <DocsExample href="forms/validation">

            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom01">Institute Name</CFormLabel>
        <CFormInput type="text" id="validationCustom01" style={{}} defaultValue="Mark" name='name' required />
        {backEndValidation['name'] ?  (
                    // <span style={{color:'#ea868f', fontSize:'0.875em'}}>{backEndValidation['name']}</span>
                    <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['name']}</CFormFeedback>
        ) : (
          <CFormFeedback valid>Looks good!</CFormFeedback>
        )}

      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom02">Short Name</CFormLabel>
        <CFormInput type="text" id="validationCustom02" defaultValue="Otto" name='shortName' required />
        {backEndValidation['shortName'] ?  (
                    // <span style={{color:'#ea868f', fontSize:'0.875em'}}>{backEndValidation['shortName']}</span>
                    <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['shortName']}</CFormFeedback>
        ) : (
          <CFormFeedback valid>Looks good!</CFormFeedback>
        )}
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustomUsername">Email</CFormLabel>
        <CInputGroup className="has-validation">
          <CInputGroupText id="inputGroupPrepend">@</CInputGroupText>
          <CFormInput
            type="text"
            id="validationCustomUsername"
            defaultValue=""
            name='email'
            aria-describedby="inputGroupPrepend"
            required
          />
          {/* <CFormFeedback invalid>Please choose a short name.</CFormFeedback> */}
           {backEndValidation['email'] ?  (
                    // <span style={{color:'#ea868f', fontSize:'0.875em'}}>{backEndValidation['email']}</span>
                    <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['email']}</CFormFeedback>
        ) : (
          <CFormFeedback valid>Looks good!</CFormFeedback>
        )}
        </CInputGroup>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom03">City</CFormLabel>
        <CFormInput type="text" id="validationCustom03" name='city' required />
        {backEndValidation['city'] ?  (
                    // <span style={{color:'#ea868f', fontSize:'0.875em'}}>{backEndValidation['city']}</span>
                    <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['city']}</CFormFeedback>
        ) : (
          <CFormFeedback valid>Looks good!</CFormFeedback>
        )}
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="validationCustom04">District</CFormLabel>
        {/* <CFormSelect id="validationCustom04">
          <option disabled>Choose...</option>
          <option>...</option>
        </CFormSelect> */}
        <CFormInput type="text" id="validationCustom04" name='district' required />
        {/* <CFormFeedback invalid>Please provide a valid district.</CFormFeedback> */}
        {backEndValidation['district'] ?  (
                    // <span style={{color:'#ea868f', fontSize:'0.875em'}}>{backEndValidation['district']}</span>
                    <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['district']}</CFormFeedback>
        ) : (
          <CFormFeedback valid>Looks good!</CFormFeedback>
        )}
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="validationCustom05">State</CFormLabel>
        <CFormInput type="text" id="validationCustom05" name='state' required />
        {/* <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback> */}
        {backEndValidation['state'] ?  (
                    // <span style={{color:'#ea868f', fontSize:'0.875em'}}>{backEndValidation['state']}</span>
                    <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['state']}</CFormFeedback>
        ) : (
          <CFormFeedback valid>Looks good!</CFormFeedback>
        )}
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom06">Phone</CFormLabel>
        <CFormInput type="text" id="validationCustom06" name='phone' required />
        {/* <CFormFeedback invalid>Please provide a valid phone.</CFormFeedback> */}
        {backEndValidation['phone'] ?  (
                    // <span style={{color:'#ea868f', fontSize:'0.875em'}}>{backEndValidation['name']}</span>
                    <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['phone']}</CFormFeedback>
        ) : (
          <CFormFeedback valid>Looks good!</CFormFeedback>
        )}
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom07">Location</CFormLabel>
        <CFormInput type="text" id="validationCustom07" name='location' required />
        {/* <CFormFeedback invalid>Please provide a valid location with landmark.</CFormFeedback> */}
        {backEndValidation['location'] ?  (
                    // <span style={{color:'#ea868f', fontSize:'0.875em'}}>{backEndValidation['name']}</span>
                    <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['location']}</CFormFeedback>
        ) : (
          <CFormFeedback valid>Looks good!</CFormFeedback>
        )}
      </CCol>
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom06">Description</CFormLabel>
        <CFormTextarea type="text" id="validationCustom06" name='description' required />
        {/* <CFormFeedback invalid>Please provide a valid phone.</CFormFeedback> */}
        {backEndValidation['description'] ?  (
                    // <span style={{color:'#ea868f', fontSize:'0.875em'}}>{backEndValidation['name']}</span>
                    <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['description']}</CFormFeedback>
        ) : (
          <CFormFeedback valid>Looks good!</CFormFeedback>
        )}
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom08">Title Image</CFormLabel>
        <CFormInput type="file" accept="image/*"  id="validationCustom08" name='titleImage'  />
        {/* <CFormFeedback invalid>Please provide a valid location with landmark.</CFormFeedback> */}
        {backEndValidation['titleImage'] ?  (
                    // <span style={{color:'#ea868f', fontSize:'0.875em'}}>{backEndValidation['name']}</span>
                    <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['titleImage']}</CFormFeedback>
        ) : (
          <CFormFeedback valid>Looks good!</CFormFeedback>
        )}
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom09">Related Documents</CFormLabel>
        <CFormInput type="file" id="validationCustom09" onChange={handleRelatedDocumentsFileChange} multiple accept=".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" name='relatedDocuments'  />
        {backEndValidation['relatedDocuments'] ?  (
                    <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['relatedDocuments']}</CFormFeedback>
        ) : (
          <CFormFeedback valid>Looks good!</CFormFeedback>
        )}
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom10">Related Videos</CFormLabel>
        <CFormInput type="file" id="validationCustom10" multiple accept=".mp4, .avi, .mkv,.webm" name='relatedVideos'  onChange={handleRelatedVideosFileChange} />
        {backEndValidation['relatedVideos'] ?  (
                    <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['relatedVideos']}</CFormFeedback>
        ) : (
          <CFormFeedback valid>Looks good!</CFormFeedback>
        )}
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom11">Related Images</CFormLabel>
        <CFormInput type="file" id="validationCustom11" multiple onChange={handleRelatedImagesFileChange} accept="image/*" name='relatedImages'  />
        {backEndValidation['relatedImages'] ?  (
                    <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['relatedImages']}</CFormFeedback>
        ) : (
          <CFormFeedback valid>Looks good!</CFormFeedback>
        )}
      </CCol>
      <CNav variant="underline-border"></CNav>
      <CCardHeader>
        <strong>Areas Of Study</strong>
      </CCardHeader>
      {areasOfStudy.map((area,index) =>(
        <React.Fragment key={index}>
            <CCol md={4}>
              <CFormLabel htmlFor="validationCustom12">Name</CFormLabel>
              <CFormInput type="text" id="validationCustom12" name={area.name}  />
              {/* {backEndValidation['relatedImages'] ?  (
                <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['relatedImages']}</CFormFeedback>
              ) : (
                <CFormFeedback valid>Looks good!</CFormFeedback>
              )} */}
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="validationCustom13">Number of students</CFormLabel>
              <CFormInput type="text" id="validationCustom13" name={area.studentCount}  />
              {/* {backEndValidation['relatedImages'] ?  (
                <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['relatedImages']}</CFormFeedback>
              ) : (
                <CFormFeedback valid>Looks good!</CFormFeedback>
              )} */}
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="validationCustom14">Rating out of 10</CFormLabel>
              <CFormInput type="text" id="validationCustom14" name={area.rating}  />
              {/* {backEndValidation['relatedImages'] ?  (
                <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['relatedImages']}</CFormFeedback>
              ) : (
                <CFormFeedback valid>Looks good!</CFormFeedback>
              )} */}
            </CCol>

            {/* <CCol md={3} className="text-end">
            {index > 0 && (
              <CFormLabel ><small> To remove this entry click below</small></CFormLabel>
            )}
            {index > 0 && (
              <CButton color="danger" onClick={() => handleAreaOfStudyRemoveClick(index)}>
                Remove
              </CButton>
            )}
          </CCol> */}
        </React.Fragment>
      ))}
       <CCol xs={12} className='text-end'>
        <CButton color="primary" style={{marginRight: '20px'}} onClick={handleAreaOfStudyAddClick}>
          Add New Entry
        </CButton>
        {areasOfStudy.length > 1 && (
              <CButton color="danger" style={{color:'white'}} onClick={() => handleAreaOfStudyRemoveClick()}>
                Remove Last Entry
              </CButton>
            )}
      </CCol>

      <CNav variant="underline-border"></CNav>
      <CCardHeader>
        <strong>Teachers</strong>
      </CCardHeader>
      {teacherList.map((teacher,index) =>(
        <React.Fragment key={index}>
            <CCol md={4}>
              <CFormLabel htmlFor="validationCustom12">Name</CFormLabel>
              <CFormInput type="text" id="validationCustom12" name={teacher.name}  />
              {/* {backEndValidation['relatedImages'] ?  (
                <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['relatedImages']}</CFormFeedback>
              ) : (
                <CFormFeedback valid>Looks good!</CFormFeedback>
              )} */}
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="validationCustom13">specialized In</CFormLabel>
              <CFormInput type="text" id="validationCustom13" name={teacher.specializedIn}  />
              {/* {backEndValidation['relatedImages'] ?  (
                <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['relatedImages']}</CFormFeedback>
              ) : (
                <CFormFeedback valid>Looks good!</CFormFeedback>
              )} */}
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="validationCustom14">Experience in years</CFormLabel>
              <CFormInput type="text" id="validationCustom14" name={teacher.experience}  />
              {/* {backEndValidation['relatedImages'] ?  (
                <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['relatedImages']}</CFormFeedback>
              ) : (
                <CFormFeedback valid>Looks good!</CFormFeedback>
              )} */}
            </CCol>

            {/* <CCol md={3} className="text-end">
            {index > 0 && (
              <CFormLabel ><small> To remove this entry click below</small></CFormLabel>
            )}
            {index > 0 && (
              <CButton color="danger" onClick={() => handleAreaOfStudyRemoveClick(index)}>
                Remove
              </CButton>
            )}
          </CCol> */}
        </React.Fragment>
      ))}
       <CCol xs={12} className='text-end'>
        <CButton color="primary" style={{marginRight: '20px'}} onClick={handleTeacherListAddClick}>
          Add New Entry
        </CButton>
        {teacherList.length > 1 && (
              <CButton color="danger" style={{color:'white'}} onClick={() => handleTeacherListRemoveClick()}>
                Remove Last Entry
              </CButton>
            )}
      </CCol>
      <CNav variant="underline-border"></CNav>
      <CCardHeader>
        <strong>Aminities</strong>
      </CCardHeader>

      {aminitiesList.map((aminity,index) =>(
        <React.Fragment key={index}>
            <CCol md={6}>
              <CFormLabel htmlFor="validationCustom12">Name</CFormLabel>
              <CFormInput type="text" id="validationCustom12" name={aminity.name}  />
              {/* {backEndValidation['relatedImages'] ?  (
                <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['relatedImages']}</CFormFeedback>
              ) : (
                <CFormFeedback valid>Looks good!</CFormFeedback>
              )} */}
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="validationCustom13">Description</CFormLabel>
              <CFormTextarea type="text" id="validationCustom13" name={aminity.description}  />
              {/* {backEndValidation['relatedImages'] ?  (
                <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['relatedImages']}</CFormFeedback>
              ) : (
                <CFormFeedback valid>Looks good!</CFormFeedback>
              )} */}
            </CCol>

        </React.Fragment>
      ))}
       <CCol xs={12} className='text-end'>
        <CButton color="primary" style={{marginRight: '20px'}} onClick={handleAminitiesListAddClick}>
          Add New Entry
        </CButton>
        {aminitiesList.length > 1 && (
              <CButton color="danger" style={{color:'white'}} onClick={() => handleAminitiesListRemoveClick()}>
                Remove Last Entry
              </CButton>
            )}
      </CCol>

      <CCol xs={12}>
        <CButton color="success" type="submit">
          Save
        </CButton>
      </CCol>
    </CForm>

            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>

    </CRow>
  )
}

export default Validation
