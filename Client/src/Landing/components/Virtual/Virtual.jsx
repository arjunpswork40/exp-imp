import React from "react";
import css from './Virtual.module.css';
import Shade from '../../assets/shade.png';
import ReactCompareImage from "react-compare-image";
import Before from '../../assets/before3.png';
import After from '../../assets/after3.png';

const Virtual = () => {
    return (
        <div className={css.Virtual}>
            <div className={css.left}>
                <span>Try TrustOwn</span>
                <span>Join us on a transformative journey, where AI pioneers connect and innovate.</span>
                <span>Try Now!</span>
                <img src={Shade} alt="" />
            </div>
            <div className={css.right}>
                <div className={css.wrapper}>
                    <ReactCompareImage leftImage={Before} sliderLineHeight={3} className={css.virtualSlider} rightImage={After} />
                </div>
            </div>
        </div>
    )
}

export default Virtual
