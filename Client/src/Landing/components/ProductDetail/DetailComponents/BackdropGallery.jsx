import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import { Backdrop, IconButton } from "@mui/material";
import prod1 from "../Pictures/image-product-1.jpg";
import prod2 from "../Pictures/image-product-2.jpg";
import prod3 from "../Pictures/image-product-3.jpg";
import prod4 from "../Pictures/image-product-4.jpg";

import thumb1 from "../Pictures/image-product-1-thumbnail.jpg";
import thumb2 from "../Pictures/image-product-2-thumbnail.jpg";
import thumb3 from "../Pictures/image-product-3-thumbnail.jpg";
import thumb4 from "../Pictures/image-product-4-thumbnail.jpg";

import CloseIcon from "./Icons/CloseIcon";
import PreviousIcon from "./Icons/PreviousIcon";
import NextIcon from "./Icons/NextIcon";


const BackdropGallery = ({ open, handleClose, currentPassedImage,images,thumbs }) => {

  const IMAGES = images;
  const THUMBS = thumbs;

  const [backdropImage, setBackdropImage] = useState(currentPassedImage);
  const [currentPassedImageIndex, setCurrentPassedImageIndex] = useState(1);
  const [tagStatus, setTagStatus]=useState(false)

  const getCurrentImageStatus = (imageURL) => {
    const extension = imageURL ? imageURL.split('.').pop().toLowerCase() : 'jpg';
    const videoExtensions = ['mp4', 'webm', 'ogg'];
    const tagStatus = videoExtensions.includes(extension)
    return tagStatus
  }

  useEffect(() => {
    setBackdropImage(currentPassedImage);
    IMAGES.forEach((imgg, index) => {
      imgg === currentPassedImage && setCurrentPassedImageIndex(index);
    });
  }, [currentPassedImage]);

  const handleClick = (index = null) => {
    const tagStatus = getCurrentImageStatus(IMAGES[index])
    setTagStatus(tagStatus);
    setBackdropImage(IMAGES[index]);
    setCurrentPassedImageIndex(index);
  };

  const handleIncrement = () => {
    if (currentPassedImageIndex === IMAGES.length - 1) {
      const tagStatus = getCurrentImageStatus(IMAGES[0])
      setTagStatus(tagStatus);
      setBackdropImage(IMAGES[0]);
      setCurrentPassedImageIndex(0);
    } else {
      const tagStatus = getCurrentImageStatus(IMAGES[currentPassedImageIndex + 1])
      setTagStatus(tagStatus);
      setBackdropImage(IMAGES[currentPassedImageIndex + 1]);
      setCurrentPassedImageIndex(currentPassedImageIndex + 1);
    }
  };

  const handleDecrement = () => {
    if (currentPassedImageIndex === 0) {
      const tagStatus = getCurrentImageStatus(IMAGES[IMAGES.length - 1])
      setTagStatus(tagStatus);
      setBackdropImage(IMAGES[IMAGES.length - 1]);
      setCurrentPassedImageIndex(IMAGES.length - 1);
    } else {
      const tagStatus = getCurrentImageStatus(IMAGES[currentPassedImageIndex - 1])
      setTagStatus(tagStatus);
      setBackdropImage(IMAGES[currentPassedImageIndex - 1]);
      setCurrentPassedImageIndex(currentPassedImageIndex - 1);
    }
  };

  const removeActivatedClass = (parent) => {
    parent.childNodes.forEach((node) => {
      node.childNodes[0].classList.contains("activated") &&
        node.childNodes[0].classList.remove("activated");
    });
  };

  return (
    <Backdrop
      className="backdrop"
      sx={{
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      <section className="backdrop-content">
        <IconButton
          onClick={handleClose}
          sx={{ color: "#fff", bgcolor: "transparent", alignSelf: "flex-end" }}
        >
          <CloseIcon fillColor={"#fff"} />
        </IconButton>
        <div className="image">
          <IconButton
            className="icon-button-prev"
            disableRipple
            onClick={() => {
              handleDecrement();
              removeActivatedClass(document.querySelector(".thumbnails"));
            }}
            sx={{
              height: "42px",
              width: "42px",
              bgcolor: "#fff",
            }}
          >
            <PreviousIcon />
          </IconButton>
          <IconButton
            className="icon-button-next"
            disableRipple
            onClick={() => {
              handleIncrement();
              removeActivatedClass(document.querySelector(".thumbnails"));
            }}
            sx={{
              height: "42px",
              width: "42px",
              bgcolor: "#fff",
            }}
          >
            <NextIcon />
          </IconButton>
          {tagStatus ? (
            <video width="450" height="450" controls={true} style={{cursor:'pointer'}}>
              <source src={backdropImage} type={`video/${backdropImage.split('.').pop().toLowerCase()}`} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={backdropImage}
              alt="selected-product"
              width='550px'
              style={{ cursor: "auto" }}
            />
          )}

        </div>
        <div className="thumbnails">
          {THUMBS.map((th, index) => {
            const extension = th ? th.split('.').pop().toLowerCase() : '';
            const videoExtensions = ['mp4', 'webm', 'ogg'];
            const tagStatusTh = videoExtensions.includes(extension)

            return (
              <div
                className="img-holder-backd"
                key={index}
                onClick={(e) => {
                  handleClick(index);
                  removeActivatedClass(e.currentTarget.parentNode);
                  e.currentTarget.childNodes[0].classList.toggle("activated");
                }}
              >
                <div
                  className={`outlay ${
                    index === currentPassedImageIndex && "activated"
                  }`}
                ></div>
                {tagStatusTh ? (
                  <video width="75" height="75" controls={false} style={{cursor:'pointer'}}>
                    <source src={th} type={`video/${th.split('.').pop().toLowerCase()}`} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img src={th} width='75px' alt={`product-${index + 1}`} />
                )}
              </div>
            );
          })}
        </div>
      </section>
    </Backdrop>
  );
};

BackdropGallery.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  currentPassedImage: PropTypes.string,
  images: PropTypes.array.isRequired,
  thumbs: PropTypes.array.isRequired,
}

export default BackdropGallery;
