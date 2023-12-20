import React from "react";
import css from './Virtual.module.css';
import Shade from '../../assets/shade.png';
import ReactCompareImage from "react-compare-image";
import Before from '../../assets/before2.png';
import After from '../../assets/after2.png';

const Virtual = () => {
    return (
        <div className={css.Virtual}>
            <div className={css.left}>
                <span>Try TrustOwn</span>
                <span>Marketers thrive, customers savor privileged excellence</span>
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