import React from "react";
import css from './Testimonials.module.css';
import Hero from '../../assets/testimonialHero3.png';
import { TestimonialsData } from "../../data/testimonials"
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from 'framer-motion';
const Testimonials = () => {
    const transition = { duration:3, type:"spring"}

    return(
        <div className={css.testimonials}>
            <div className={css.wrapper}>
                <div className={css.container}>
                    <span>Top rated</span>
                    <span>Empowering global trade: Seamlessly connect, import, export, thrive everywhere.
                    </span>
                </div>
                <img

                    src={Hero}
                    alt=""
                />

                <div className={css.container}>
                    <span>100k</span>
                    <span>Happy customer with us</span>
                </div>
            </div>

            <div className={css.reviews}>Reviews</div>

            <div className={css.carousal}>
                <Swiper
                    slidesPerView={3}
                    slidesPerGroup={1}
                    spaceBetween={20}
                    className={css.tCarousel}
                    breakpoints={{
                        856: {
                            slidesPerView: 3
                        },
                        640: {
                            slidesPerView: 2
                        },
                        0:{
                            slidesPerView: 1
                        }
                    }}
                >
                    {
                        TestimonialsData.map((testimonial,i)=>(
                            <SwiperSlide key={i}>
                                <div

                                    className={css.testimonial}>
                                    <img src={testimonial.image} alt="" />
                                    <span>{testimonial.comment}</span>
                                    <hr/>
                                    <span>{testimonial.name}</span>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default Testimonials


