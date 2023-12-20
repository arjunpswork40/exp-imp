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
                <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1.5 }}
                    className={css.text1}
                >
                    Global Trade, Local Expertise
                </motion.span>

                <div className={css.text2}>
                    <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.5 }}>
                    Global Link
                    </motion.span>
                    <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.5 }}>
                    Connecting businesses worldwide for seamless trade.
                    </motion.span>
                </div>
                </div>

            {/* middle side hero image */}

            <div className={css.wrapper}>

                {/* bluecircle animation */}

                <motion.div 
                initial={{bottom:"4rem"}}
                whileInView={{bottom:"0rem"}}
                transition={transition}
                className={css.blueCircle}>
                     <div className={css.centeredText}>
                        Trustown
                    </div>
                </motion.div>

                {/* hero image animation */}

                <motion.img
                transition={transition}
                initial={{bottom:"-4rem"}}
                whileInView={{bottom:"0rem"}}
                animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 0, 0, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                  }}
                src={HeroImg} alt="" width={600} />

                {/* cart div animation */}

                <motion.div
                transition={transition}
                initial={{right:"4%"}}
                whileInView={{right:"2%"}}
                className={css.cart2}>
                    <RiShoppingBagFill/>

                    <div className={css.signup}>
                        <span>Best Signup Offers</span>

                        <div>
                            <BsArrowRight/>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* right side */}

            <div className={css.h_sides}>
                <div className={css.traffic}>
                    <motion.span
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 1 }} 
                    >1.5m</motion.span>
                    <motion.span
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 1 }} 
                    >Monthly Traffic</motion.span>
                </div>

                <div className={css.customers}>
                    <motion.span
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 1 }} 
                    >100k</motion.span>
                    <motion.span
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 1 }} 
                    >happy Customers</motion.span>
                </div>
            </div>
        </div>


    )
}

export default Hero