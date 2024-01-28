import React, {useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import AdminModel from '../../../../models/Admin/Auth/AdminModel'
import AuthController from '../../../../controllers/Admin/Auth/AuthController'

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  const handleLogin = async () => {
    try {
      const user = new AdminModel(email, password);
      const response = await AuthController.login(user);
      // Handle successful login (e.g., redirect to dashboard)
      if (response.success) {
        console.log(response.data.tokenStatus)
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('tokenStatus', response.data.tokenStatus);
        navigate('/admin/dashboard');
        // Handle successful login (e.g., redirect to dashboard)
      } else {
        // Handle validation errors
        if(response.statusCode === 400) {
          setErrorMessages(response.errors.map((error) => error));
        } else if(response.statusCode === 401) {
          setErrorMessages(response);
        }
      }
    } catch (error) {
      if(error.statusCode === 400) {
        setErrorMessages(error.errors?.map((error) => error));
      } else if(error.statusCode === 401) {
        setErrorMessages(error);
      }


      console.error('Login failed', errorMessages.statusCode);
      // Handle login error (e.g., display error message)
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </CInputGroup>
                    {errorMessages.length > 0 && (
                        <div className="text-danger mt-2">
                          {errorMessages
                            .filter((error) => error?.param === 'email')
                            .map((filteredError, index) => (
                              <p key={index}>{filteredError.msg}</p>
                            ))}
                        </div>
                      )}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                      />
                      {errorMessages.statusCode === 401 && (
                        <div className="text-danger mt-2">
                          <p >{errorMessages.message}</p>
                        </div>
                      )}
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleLogin}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                    {errorMessages.length > 0 && (
                        <div className="text-danger mt-2">
                          {errorMessages
                            .filter((error) => error.statusCode === '401')
                            .map((filteredError, index) => (
                              <p key={index}>{filteredError.message}</p>
                            ))}
                        </div>
                      )}
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
