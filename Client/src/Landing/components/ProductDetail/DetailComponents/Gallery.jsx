import React, { useState, useEffect } from "react";
import BackdropGallery from "./BackdropGallery";

import PropTypes from 'prop-types';

// const IMAGES = [prod1, prod2, prod3, prod4];
// const THUMBS = [thumb1, thumb2, thumb3, thumb4];

const Gallery = ({institutrDetails}) => {

  const IMAGES = [institutrDetails.titleImage,...(institutrDetails.relatedImages || []),...(institutrDetails.relatedVideos || [])]
const THUMBS = [institutrDetails.titleImage,...(institutrDetails.relatedImages || [] ),...(institutrDetails.relatedVideos || [])]
  const [currentImage, setCurrentImage] = useState(institutrDetails.titleImage);
  const [currentPassedImage, setCurrentPassedImage] = useState(institutrDetails.titleImage);

  const [tagStatus, setTagStatus]=useState(false)
  const [open, setOpen] = useState(false);

  const getCurrentImageStatus = (imageURL) => {
    const extension = imageURL ? imageURL.split('.').pop().toLowerCase() : 'jpg';
    const videoExtensions = ['mp4', 'webm', 'ogg'];
    const tagStatus = videoExtensions.includes(extension)
    return tagStatus
  }

  const handleClick = (index) => {
    const tagStatus = getCurrentImageStatus(IMAGES[index])
    setTagStatus(tagStatus);
    setCurrentImage(IMAGES[index]);
  };
  const handleToggle = () => {
    const tagStatus = getCurrentImageStatus(currentImage)
    setTagStatus(tagStatus);
    setCurrentPassedImage(currentImage);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const removeActivatedClass = (parent) => {
    parent.childNodes.forEach((node) => {
      node.childNodes[0].classList.contains("activated") &&
        node.childNodes[0].classList.remove("activated");
    });
  };
  useEffect(() => {
    setCurrentImage(institutrDetails.titleImage);
    setCurrentPassedImage(institutrDetails.titleImage);
  }, [institutrDetails.titleImage]);



  return (
    <section className="gallery-holder hide-in-mobile">
      <section className="gallery">
        <div className="image">
          {tagStatus ? (
            <video width="500" height="500" controls={true} style={{cursor:'pointer'}}>
              <source src={currentImage} type={`video/${currentImage.split('.').pop().toLowerCase()}`} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={currentImage} style={{width:'500px'}} alt="product-1" onClick={handleToggle} />
          )}

        </div>
        <BackdropGallery
          handleClose={handleClose}
          open={open}
          currentPassedImage={currentPassedImage}
          images={IMAGES}
          thumbs={THUMBS}
        />
        <div className="thumbnails">
          {THUMBS.map((th, index) => {
            const extension = th ? th.split('.').pop().toLowerCase() : '';
            const videoExtensions = ['mp4', 'webm', 'ogg'];
            const tagStatus = videoExtensions.includes(extension)

            return (
              <div
                className="img-holder"
                key={index}
                onClick={(e) => {
                  handleClick(index);
                  removeActivatedClass(e.currentTarget.parentNode);
                  e.currentTarget.childNodes[0].classList.toggle("activated");
                }}
              >
                <div className={`outlay ${index === 0 && "activated"}`}></div>

                {tagStatus ? (
                  <video width="83" height="83" controls={false}>
                    <source src={th} type={`video/${th.split('.').pop().toLowerCase()}`} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img src={th} width='83px' alt={`product-${index + 1}`} />
                )}

              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
};

Gallery.propTypes = {
  institutrDetails: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired,
}

export default Gallery;
