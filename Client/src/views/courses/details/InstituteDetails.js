import React, { useState, useEffect } from 'react'
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
import DocumentIcon from '../../../Landing/components/ProductDetail/DetailComponents/Icons/DocumentIcon';
import { IconButton } from '@mui/material';

const Validation = () => {
  const [validated, setValidated] = useState(false)
  const [instituteDetails, setInstituteDetails] = useState({})
  const [backEndValidation, setBackEndValidation] = useState(false)
  const token = AuthService.getAccessToken();
  const navigate = useNavigate();
  const location = useLocation();
  let { institueData, continent, countryId, instituteId } = location.state || {};


  const [areasOfStudy, setAreasOfStudy] = useState([
    {
      name: 'areaOfStudy-name',
      studentCount:'areaOfStudy-studentsCount',
      rating:'areaOfStudy-rating',
      nameValue:'',
      studentCountValue:'',
      ratingValue:''
    }
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
        nameValue:'',
        studentCountValue:'',
        ratingValue:''
      },
    ]);
  };

  const handleAreaOfStudyRemoveClick = () => {
    const updatedAreasOfStudy = areasOfStudy.slice(0,-1)

    setAreasOfStudy(updatedAreasOfStudy);
    setAreaOfStudyEntryCount((prevCount) => prevCount - 1);
  };

  const [teacherList, setTeacherList] = useState([
    {
      name:'teacherlist-nameOfTheTeacher',
      specializedIn:'teacherlist-specializedIn',
      experience:'teacherlist-expirence',
      nameValue:'',
      specializedInValue:'',
      experienceValue:''
    }
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
        nameValue:'',
        specializedInValue:'',
        experienceValue:''
      },
    ]);
  };


  const [aminitiesList, setAminitiesList] = useState([
    {name:'aminitiesList-name',description:'aminitiesList-description',nameValue:'',descriptionValue:''}
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
        nameValue:'',
        descriptionValue:''
      },
    ]);
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

  const removeFileFromDetails = async (fileName,fileFieldname) => {
    let postData = {
      continent:continent,
      instituteId:instituteId,
      fileName:fileName,
      fileFieldname:fileFieldname
    }
    try{
      let response = await InstituteDetailsController.removeFileFromDetailsController(token,postData);
      if(response.success){
        setInstituteDetails(response.data)
      }
    } catch(error) {
      console.log('Error on remove file => ', error)
    }

  }

  const handleAminitiesListRemoveClick = () => {
    const updatedAminitiesList = aminitiesList.slice(0,-1)

    setAminitiesList(updatedAminitiesList);
    setAminitiesListCount((prevCount) => prevCount - 1);
  };


  const handleTeacherListRemoveClick = () => {
    const updatedTeacherList = teacherList.slice(0,-1)

    setTeacherList(updatedTeacherList);
    setTeacherListCount((prevCount) => prevCount - 1);
  };

  const fetchInstituteDetails = async() => {
    let response = [];
    try{
      let postData = {continent:continent,instituteId:instituteId}
      response = await InstituteDetailsController.fetchInstituteDetailsById(token,postData);
      console.log('response==>',response)
      localStorage.setItem('tokenStatus', response.data.tokenStatus);
      setInstituteDetails(response.data);
      if(response.data?.amenities.length > 0) {
        let previousData = response.data?.amenities.map((item,index)=>{

          setAminitiesListCount(index+1);
          return {
            name: `aminitiesList-name-${index+1}`,
            description: `aminitiesList-description-${index+1}`,
            nameValue:item.name,
            descriptionValue:item.description
          }
        })
        setAminitiesList(previousData)
      }
      if(response.data?.teachersList.length > 0) {
        let previousData = response.data?.teachersList.map((item,index)=>{

          setTeacherListCount(index+1);
          return {
            name: `teacherlist-nameOfTheTeacher-${index+1}`,
            specializedIn: `teacherlist-specializedIn-${index+1}`,
            experience: `teacherlist-expirence-${index+1}`,
            nameValue:item.nameOfTheTeacher,
            specializedInValue:item.specializedIn,
            experienceValue:item.experience
          }
        })
        setTeacherList(previousData)
      }
      if(response.data?.areasOfStudy.length > 0) {
        let previousData = response.data?.areasOfStudy.map((item,index)=>{

          setAreaOfStudyEntryCount(index+1);
          return {
            name: `areaOfStudy-name-${index+1}`,
            studentCount: `areaOfStudy-studentsCount-${index+1}`,
            rating: `areaOfStudy-rating-${index+1}`,
            nameValue:item.name,
            studentCountValue:item.studentsCount,
            ratingValue:item.rating
          }
        })
        setAreasOfStudy(previousData)
      }
    } catch(error) {
      console.log('Error on institute detail fetch => ', error)
    }
  }

  useEffect(()=>{
    fetchInstituteDetails();
  },[]);

  const handleSubmit = async (event) => {
    console.log('token:', token);

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault(); // Prevent default form submission
      setValidated(true);

      // Extract data from the form
      const formData = new FormData(form);
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
      postData['instituteId'] = instituteId;
      let response = [];
      console.log(postData);

      try{
        response = await InstituteDetailsController.updateInstituteDetail(token,postData);
        console.log('response==>',response.data)
        localStorage.setItem('tokenStatus', response.data.tokenStatus);
        if(response.success){
          institueData = institueData.filter((item) => item._id != response.data._id)
          institueData.push(response.data)
          institueData = institueData.map((item) => {
            if (item._id === response.data._id) {
              return response.data; // Return the updated item
            } else {
              return item; // Return the unchanged item
            }
          })
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
      }

    }
    setValidated(true)
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Institute</strong> <small>Update Institue Details</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Update education details here.
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
    >
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom01">Institute Name</CFormLabel>
        <CFormInput type="text" id="validationCustom01" style={{}} defaultValue={instituteDetails.name} name='name' required />
        {backEndValidation['name'] ?  (
          <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['name']}</CFormFeedback>
        ) : (
          <CFormFeedback valid>Looks good!</CFormFeedback>
        )}

      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom02">Short Name</CFormLabel>
        <CFormInput type="text" id="validationCustom02" defaultValue={instituteDetails.shortName} name='shortName' required />
        {backEndValidation['shortName'] ?  (
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
            defaultValue={instituteDetails.email}
            name='email'
            aria-describedby="inputGroupPrepend"
            required
          />
          {/* <CFormFeedback invalid>Please choose a short name.</CFormFeedback> */}
           {backEndValidation['email'] ?  (
              <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['email']}</CFormFeedback>
        ) : (
          <CFormFeedback valid>Looks good!</CFormFeedback>
        )}
        </CInputGroup>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom03">City</CFormLabel>
        <CFormInput type="text" id="validationCustom03" defaultValue={instituteDetails.city} name='city' required />
        {/* <CFormFeedback invalid>Please provide a valid city.</CFormFeedback> */}
        {backEndValidation['city'] ?  (
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
        <CFormInput type="text" id="validationCustom04" defaultValue={instituteDetails.district} name='district' required />
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
        <CFormInput type="text" id="validationCustom05" defaultValue={instituteDetails.state} name='state' required />
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
        <CFormInput type="text" id="validationCustom06" defaultValue={instituteDetails.phone} name='phone' required />
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
        <CFormInput type="text" id="validationCustom07" defaultValue={instituteDetails.location} name='location' required />
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
        <CFormTextarea type="text" id="validationCustom06" name='description' value={instituteDetails.description} required />
        {/* <CFormFeedback invalid>Please provide a valid phone.</CFormFeedback> */}
        {backEndValidation['description'] ?  (
                    // <span style={{color:'#ea868f', fontSize:'0.875em'}}>{backEndValidation['name']}</span>
                    <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['description']}</CFormFeedback>
        ) : (
          <CFormFeedback valid>Looks good!</CFormFeedback>
        )}
      </CCol>
      <CCardHeader>
        <strong>Documents</strong>
      </CCardHeader>

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
        <div style={{display: 'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px'}}>
          {instituteDetails.titleImage && instituteDetails.titleImage != '' ? (
            <div style={{textAlign:'center',marginTop:'10px'}}>
            <div>
              <img src={instituteDetails.titleImage} alt='Title image' width='80px' height='65px' /><br></br>
              <CButton color="danger" onClick={() =>removeFileFromDetails(instituteDetails.titleImage,'titleImage')} style={{color:'white',marginTop:'10px'}} >
                Remove
              </CButton>
            </div>
          </div>
          ):(
            <div style={{textAlign:'center',marginTop:'10px'}}>

          </div>
          )}
        </div>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom09">Related Documents</CFormLabel>
        <CFormInput type="file" id="validationCustom09" onChange={handleRelatedDocumentsFileChange} multiple accept=".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" name='relatedDocuments'  />
        {backEndValidation['relatedDocuments'] ?  (
                    <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['relatedDocuments']}</CFormFeedback>
        ) : (
          <CFormFeedback valid>Looks good!</CFormFeedback>
        )}
         <div style={{display: 'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px'}}>
          {instituteDetails.relatedDocuments && instituteDetails.relatedDocuments.length > 0 ? (
            instituteDetails.relatedDocuments.map((item,index) => {
              const parts = item.split('/');
              const fileNameWithExtension = parts[parts.length - 1];
              let fileName = fileNameWithExtension;
              if (fileNameWithExtension.length > 6) {
                const fileNameWithoutExtension = fileNameWithExtension.split('.')[0];
                const truncatedFileName = fileNameWithoutExtension.slice(0, 6) + '...';
                fileName =  truncatedFileName + '.' + fileNameWithExtension.split('.').pop();
              }
              return(
                  <div style={{textAlign:'center'}} key={index}>
                    <IconButton
                      sx={{ color: "#fff", bgcolor: "transparent", alignSelf: "flex-end" }}
                    >
                      <DocumentIcon></DocumentIcon>
                    </IconButton>
                    <br></br>
                  <a  href={item}>
                    {fileName}
                  </a>
                    <br></br>
                    <CButton color="danger" onClick={() => removeFileFromDetails(item,'relatedDocuments')} style={{color:'white',marginTop:'10px'}} >
                      Remove
                    </CButton>
                  </div>
              )
            })
          ) : (
          <div style={{textAlign:'center'}}>
          </div>
          )}
        </div>

      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom10">Related Videos</CFormLabel>
        <CFormInput type="file" id="validationCustom10" multiple accept=".mp4, .avi, .mkv,.webm" name='relatedVideos'  onChange={handleRelatedVideosFileChange} />
        {backEndValidation['relatedVideos'] ?  (
                    <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['relatedVideos']}</CFormFeedback>
        ) : (
          <CFormFeedback valid>Looks good!</CFormFeedback>
        )}
        <div style={{display: 'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px'}}>
          {instituteDetails.relatedVideos && instituteDetails.relatedVideos.length > 0 ? (
            instituteDetails.relatedVideos.map((item,index) => {

              return(
                <div key={index} style={{textAlign:'center',marginTop:'10px'}}>
                  <div>
                    <video width="133" height="80" controls={true}>
                      <source src={item} type={`video/${item.split('.').pop().toLowerCase()}`} />
                      Your browser does not support the video tag.
                    </video>
                    <br></br>
                    <CButton color="danger" onClick={() => removeFileFromDetails(item,'relatedVideos')} style={{color:'white'}} >
                      Remove
                    </CButton>
                  </div>
                  </div>
              )
            })
          ) : (
          <div style={{textAlign:'center'}}>
          </div>
          )}
        </div>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom11">Related Images</CFormLabel>
        <CFormInput type="file" id="validationCustom11" multiple onChange={handleRelatedImagesFileChange} accept="image/*" name='relatedImages'  />
        {backEndValidation['relatedImages'] ?  (
                    <CFormFeedback style={{display:'block'}} invalid>{backEndValidation['relatedImages']}</CFormFeedback>
        ) : (
          <CFormFeedback valid>Looks good!</CFormFeedback>
        )}
        <div style={{display: 'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px'}}>
          {instituteDetails.relatedImages && instituteDetails.relatedImages.length > 0 ? (
            instituteDetails.relatedImages.map((item,index) => {

              return(
                <div key={index} style={{textAlign:'center',marginTop:'10px'}}>
                  <div>
                    <img src={item} alt='related image' width='80px' height='65px' /><br></br>
                    <br></br>
                    <CButton color="danger" onClick={() => removeFileFromDetails(item,'relatedImages')} style={{color:'white'}} >
                      Remove
                    </CButton>
                  </div>
                  </div>
              )
            })
          ) : (
          <div style={{textAlign:'center'}}>
          </div>
          )}
        </div>
      </CCol>


      <CNav variant="underline-border"></CNav>
      <CCardHeader>
        <strong>Areas Of Study</strong>
      </CCardHeader>
      {areasOfStudy && areasOfStudy.map((area,index) =>(
        <React.Fragment key={index}>
            <CCol md={4}>
              <CFormLabel htmlFor="validationCustom12">Name</CFormLabel>
              <CFormInput type="text" id="validationCustom12" value={area.nameValue} name={area.name}  />

            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="validationCustom13">Number of students</CFormLabel>
              <CFormInput type="text" id="validationCustom13" value={area.studentCountValue} name={area.studentCount}  />

            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="validationCustom14">Rating out of 10</CFormLabel>
              <CFormInput type="text" id="validationCustom14" value={area.ratingValue} name={area.rating}  />
            </CCol>
        </React.Fragment>
      ))}
       <CCol xs={12} className='text-end'>
        <CButton color="primary" style={{marginRight: '20px'}} onClick={handleAreaOfStudyAddClick}>
          Add New Entry
        </CButton>
        {areasOfStudy && areasOfStudy.length > 1 && (
              <CButton color="danger" style={{color:'white'}} onClick={() => handleAreaOfStudyRemoveClick()}>
                Remove Last Entry
              </CButton>
            )}
      </CCol>

      <CNav variant="underline-border"></CNav>
      <CCardHeader>
        <strong>Areas Of Study - Teacher list</strong>
      </CCardHeader>
      {teacherList && teacherList.map((teacher,index) =>(
        <React.Fragment key={index}>
            <CCol md={4}>
              <CFormLabel htmlFor="validationCustom12">Name</CFormLabel>
              <CFormInput type="text" id="validationCustom12" value={teacher.nameValue} name={teacher.name}  />

            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="validationCustom13">specialized In</CFormLabel>
              <CFormInput type="text" id="validationCustom13" value={teacher.specializedInValue} name={teacher.specializedIn}  />

            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="validationCustom14">Experience in years</CFormLabel>
              <CFormInput type="text" id="validationCustom14" value={teacher.experienceValue} name={teacher.experience}  />
            </CCol>

        </React.Fragment>
      ))}
       <CCol xs={12} className='text-end'>
        <CButton color="primary" style={{marginRight: '20px'}} onClick={handleTeacherListAddClick}>
          Add New Entry
        </CButton>
        {teacherList && teacherList.length > 1 && (
              <CButton color="danger" style={{color:'white'}} onClick={() => handleTeacherListRemoveClick()}>
                Remove Last Entry
              </CButton>
            )}
      </CCol>
      <CCardHeader>
        <strong>Aminities</strong>
      </CCardHeader>
      {aminitiesList && aminitiesList.map((aminity,index) =>(
        <React.Fragment key={index}>
            <CCol md={6}>
              <CFormLabel htmlFor="validationCustom12">Name</CFormLabel>
              <CFormInput type="text" id="validationCustom12" value={aminity.nameValue} name={aminity.name}  />

            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="validationCustom13">Description</CFormLabel>
              <CFormTextarea type="text" id="validationCustom13" value={aminity.descriptionValue} name={aminity.description}  />

            </CCol>

        </React.Fragment>
      ))}
       <CCol xs={12} className='text-end'>
        <CButton color="primary" style={{marginRight: '20px'}} onClick={handleAminitiesListAddClick}>
          Add New Entry
        </CButton>
        {aminitiesList && aminitiesList.length > 1 && (
              <CButton color="danger" style={{color:'white'}} onClick={() => handleAminitiesListRemoveClick()}>
                Remove Last Entry
              </CButton>
            )}
      </CCol>

      <CCol xs={12}>
        <CButton color="success" type="submit">
          Update
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
