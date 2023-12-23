import React from 'react';
import css from './Hero.module.css';
import HeroImg from '../../assets/hero2.png';
import {RiShoppingBagFill} from 'react-icons/ri';
import {BsArrowRight} from 'react-icons/bs';
import {motion} from 'framer-motion'

const Hero = () => {
    const transition = { duration:3, type:"spring"}
    return (
        <div className={css.container}>

            {/* left side */}

            <div className={css.h_sides}>
                <span

                >
                    Global Trade, Local Expertise
                </span>

                <div className={css.text2}>
                    <span >
                    Global Link
                    </span>
                    <span >
                    Connecting businesses worldwide for seamless trade.
                    </span>
                </div>
                </div>

            {/* middle side hero image */}

            <div className={css.wrapper}>

                {/* bluecircle animation */}

                <div

                className={css.blueCircle}>
                     <div className={css.centeredText}>
                        Trustown
                    </div>
                </div>

                {/* hero image animation */}

                <img

                src={HeroImg} alt="" width={600} />

                {/* cart div animation */}

                <div

                className={css.cart2}>
                    <RiShoppingBagFill/>

                    <div className={css.signup}>
                        <span>Best Signup Offers</span>

                        <div>
                            <BsArrowRight/>
                        </div>
                    </div>
                </div>
            </div>

            {/* right side */}

            <div className={css.h_sides}>
                <div className={css.traffic}>
                    <span
                    >1.5m</span>
                    <span

                    >Monthly Traffic</span>
                </div>

                <div className={css.customers}>
                    <span

                    >100k</span>
                    <span

                    >happy Customers</span>
                </div>
            </div>
        </div>


    )
}

export default Hero
