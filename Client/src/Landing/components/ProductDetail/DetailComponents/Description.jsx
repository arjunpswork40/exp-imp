import React, { useEffect, useState } from "react";
// import CartIcon from "./Icons/CartIcon";
// import QuantityButton from "./QuantityButton";
import { IconButton } from "@mui/material";
import DocumentIcon from "./Icons/DocumentIcon";

import PropTypes from 'prop-types';
const Description = ({institutrDetails  }) => {
  const [docDetails, setDocDetails] = useState([])

  useEffect(() => {
    setDocDetails(institutrDetails.relatedDocuments);
  },[institutrDetails.relatedDocuments])
  console.log(docDetails)
  return (
    <section className="description">
      <p className="pre">{institutrDetails.shortName}</p>
      <h1>{institutrDetails.name}</h1>
      <p className="desc">
      {institutrDetails.description}
      </p>
      <div className="price">
        <div className="main-tag">
          <p>Documents</p>
        </div>
      </div>
      <div className="buttons" style={{display:'flow'}}>
        {/* <QuantityButton onQuant={onQuant} onRemove={onRemove} onAdd={onAdd} />
        <button
          className="add-to-cart"
          onClick={() => {
            onSetOrderedQuant(onQuant);
          }}
        >
          <CartIcon />
          add to cart
        </button> */}

         <div className="grid-container">
         {docDetails && docDetails.map((item,index) => {
          const parts = item.split('/');
          const fileNameWithExtension = parts[parts.length - 1];
          let fileName = fileNameWithExtension;
          if (fileNameWithExtension.length > 6) {
            const fileNameWithoutExtension = fileNameWithExtension.split('.')[0];
            const truncatedFileName = fileNameWithoutExtension.slice(0, 6) + '...';
            fileName =  truncatedFileName + '.' + fileNameWithExtension.split('.').pop();
          }
          return(

          <a className="grid-item" href={item} key={index}>
          <IconButton
            sx={{ color: "#fff", bgcolor: "transparent", alignSelf: "flex-end" }}
          >
            <DocumentIcon/>
          </IconButton>
          <br></br>
          {fileName}
          </a>
          )

        })}
      </div>
      </div>
    </section>
  );
};

Description.propTypes = {
  institutrDetails: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired,

}

export default Description;
