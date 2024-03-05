import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Generals/Button';
import './Recommended.css';

const Recommended = ({ onButtonClick, styleDetails }) => {
  return (
    <>
      <div>
        <h2 className="recommended-title">Continents</h2>
        <div className="recommended-flex">
          <Button styleDetails={styleDetails} onClickHandler={() => onButtonClick('Asia')} value="Asia" title="Asia" />
          <Button styleDetails={styleDetails} onClickHandler={() => onButtonClick('Africa')} value="Africa" title="Africa" />
          <Button styleDetails={styleDetails} onClickHandler={() => onButtonClick('Australia')} value="Australia" title="Australia" />
          <Button styleDetails={styleDetails} onClickHandler={() => onButtonClick('NorthAmerica')} value="NorthAmerica" title="NorthAmerica" />
          <Button styleDetails={styleDetails} onClickHandler={() => onButtonClick('SouthAmerica')} value="SouthAmerica" title="SouthAmerica" />
          <Button styleDetails={styleDetails} onClickHandler={() => onButtonClick('Europe')} value="Europe" title="Europe" />

        </div>
      </div>
    </>
  );
};

Recommended.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  styleDetails: PropTypes.object.isRequired
};

export default Recommended;
