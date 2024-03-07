import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";

import NextIcon from "./Icons/NextIcon";
import PreviousIcon from "./Icons/PreviousIcon";
import PropTypes from 'prop-types';


const MobileGallery = ({institutrDetails}) => {
  console.log(institutrDetails.titleImage,'<=institutrDetails.titleImage')
  const IMAGES = [institutrDetails.titleImage,...(institutrDetails.relatedImages || []),...(institutrDetails.relatedVideos || [])]

  const [currentMobileImage, setCurrentMobileImage] = useState(institutrDetails.titleImage);
  const [mobileImageIndex, setMobileImageIndex] = useState(1);
  const [tagStatus, setTagStatus]=useState(false)

  const getCurrentImageStatus = (imageURL) => {
    const extension = imageURL ? imageURL.split('.').pop().toLowerCase() : 'jpg';
    const videoExtensions = ['mp4', 'webm', 'ogg'];
    const tagStatus = videoExtensions.includes(extension)
    return tagStatus
  }

  const handleIncrement = () => {
    if (mobileImageIndex === IMAGES.length - 1) {
      const tagStatus = getCurrentImageStatus(IMAGES[0])
      setTagStatus(tagStatus);
      setCurrentMobileImage(IMAGES[0]);
      setMobileImageIndex(0);
    } else {
      const tagStatus = getCurrentImageStatus(IMAGES[mobileImageIndex + 1])
      setTagStatus(tagStatus);
      setCurrentMobileImage(IMAGES[mobileImageIndex + 1]);
      setMobileImageIndex(mobileImageIndex + 1);
    }
  };

  const handleDecrement = () => {
    if (mobileImageIndex === 0) {
      const tagStatus = getCurrentImageStatus(IMAGES[IMAGES.length - 1])
      setTagStatus(tagStatus);
      setCurrentMobileImage(IMAGES[IMAGES.length - 1]);
      setMobileImageIndex(IMAGES.length - 1);
    } else {
      const tagStatus = getCurrentImageStatus(IMAGES[mobileImageIndex - 1])
      setTagStatus(tagStatus);
      setCurrentMobileImage(IMAGES[mobileImageIndex - 1]);
      setMobileImageIndex(mobileImageIndex - 1);
    }
  };

  useEffect(() => {
    setCurrentMobileImage(institutrDetails.titleImage);
  }, [institutrDetails.titleImage]);

  return (
    <section className="mobile-gallery hide-in-desktop">
      <IconButton
        className="icon-button-prev"
        disableRipple
        onClick={handleDecrement}
        sx={{
          height: "42px",
          width: "42px",
          bgcolor: "#fff",
        }}
      >
        <PreviousIcon />
      </IconButton>
      { tagStatus ? (
        <video width='300' height='300'  controls={true} style={{cursor:'pointer'}}>
              <source src={currentMobileImage} type={`video/${currentMobileImage.split('.').pop().toLowerCase()}`} />
              Your browser does not support the video tag.
            </video>
      ) : (
        <img src={currentMobileImage} alt="featured-product" />
      )}
      <IconButton
        className="icon-button-next"
        disableRipple
        onClick={handleIncrement}
        sx={{
          height: "42px",
          width: "42px",
          bgcolor: "#fff",
        }}
      >
        <NextIcon />
      </IconButton>
    </section>
  );
};

MobileGallery.propTypes = {
  institutrDetails: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired,

}

export default MobileGallery;
