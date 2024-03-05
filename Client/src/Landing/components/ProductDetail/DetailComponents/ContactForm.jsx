import React, { useEffect, useState } from 'react';
import {
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBTextArea
} from 'mdb-react-ui-kit';
import PropTypes from 'prop-types';
import LandingController from '../../../../controllers/Landing/LandingController';

const ContactForm = ({institutrDetails,continent})  =>{
  console.log(institutrDetails,'<==institutrDetails')

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    countryId:institutrDetails.countryId,
    continent: continent,
    instituteId:institutrDetails._id
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Invalid phone number format';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  useEffect(()=>{
    let updatedFormData = formData;
    updatedFormData.countryId = institutrDetails.countryId;
    updatedFormData.instituteId = institutrDetails._id;

    setFormData(updatedFormData)

  },[institutrDetails])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const [successMessage, setSuccessMessage] = useState({
    status:false,
    type:'success',
    message:''
  });

  useEffect(() => {
    // Clear success message after 3 seconds
    const timeoutId = setTimeout(() => {
      setSuccessMessage({
        status:false,
        type:'success',
        message:''
      });
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [successMessage]);

   const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {

      try {
        console.log(formData);
        let result = await LandingController.storeEnquery(formData)
        console.log(result.success)
        if(result.success){
          setSuccessMessage({
            status:true,
            type:'success',
            message:'Form submitted successfully'
          });
          setFormData({
            name: '',
            phone: '',
            email: '',
            message: '',
            countryId:institutrDetails.countryId,
            continent: continent,
            instituteId:institutrDetails._id
          })
        } else {
          setSuccessMessage({
            status:true,
            type:'failed',
            message:'Form submission failed'
          });
        }
      } catch (error) {
        // Handle errors
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <>
    <h2>Contact Us For More Information</h2>

    <form onSubmit={handleSubmit}>
      <div className="grid-container-form">
        <div className='grid-item-form'>
          {errors.name ? (
            <MDBInput
              wrapperClass='mb-4'
              label={errors.name}
              id='name'
              value={formData.name}
              onChange={handleChange}
              style={{ borderColor: 'red', borderRadius: '8px' }}
              labelStyle={{ color: 'red' }}
            />
          ):(
            <MDBInput
              wrapperClass='mb-4'
              label='Name'
              id='name'
              value={formData.name}
              onChange={handleChange}
            />
          )}

        </div>
        <div className='grid-item-form'>
          {errors.phone ? (
            <MDBInput
              type='text'
              wrapperClass='mb-4'
              label={errors.phone}
              id='phone'
              style={{ borderColor: 'red', borderRadius: '8px' }}
              labelStyle={{ color: 'red' }}
              value={formData.phone}
              onChange={handleChange}
            />
          ):(
            <MDBInput
              type='text'
              wrapperClass='mb-4'
              label='Phone'
              id='phone'
              value={formData.phone}
              onChange={handleChange}
            />
          )}

        </div>
      </div>
      {errors.email ? (
        <MDBInput
        type='text'
        wrapperClass='mb-4'
        label={errors.email}
        id='email'
        style={{ borderColor: 'red', borderRadius: '8px' }}
        labelStyle={{ color: 'red' }}
        value={formData.email}
        onChange={handleChange}
      />
      ): (
        <MDBInput
            type='email'
            wrapperClass='mb-4'
            label='Email address'
            id='email'
            value={formData.email}
            onChange={handleChange}
          />
      )}

        {errors.message ? (
          <MDBTextArea
            wrapperClass='mb-4'
            rows={8}
            label={errors.message}
            id='message'
            style={{ borderColor: 'red', borderRadius: '8px' }}
            labelStyle={{ color: 'red' }}
            value={formData.message}
            onChange={handleChange}
          />
        ) : (
          <MDBTextArea
            wrapperClass='mb-4'
            rows={8}
            label='Message'
            id='message'
            value={formData.message}
            onChange={handleChange}
          />
        )}

      <MDBBtn type='submit' className='mb-4' block>
        Sign in
      </MDBBtn>

      {successMessage.status && (
          <div className="success-message" style={{color: successMessage.type === 'success' ? 'green' : 'red'}}>{successMessage.message}</div>
        )}
    </form>
    </>
  );
}

ContactForm.propTypes = {
  institutrDetails: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired,
  continent: PropTypes.string.isRequired

}

export default ContactForm
