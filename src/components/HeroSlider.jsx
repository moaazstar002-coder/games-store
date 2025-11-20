import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./heroslider.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function HeroSlider() {
  return (
    <div className="hero-slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        loop={true}
        className="slider"
      >
        <SwiperSlide>
          <img src="/images/assassins-creed-shadows.jpeg" alt="assassins-creed-shadows" />

        </SwiperSlide>

        <SwiperSlide>
          <img src="/images/God Of War.jpeg" alt="God Of War" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="/images/battlefield6.jpeg" alt="battlefield-6" />
        </SwiperSlide>

      </Swiper>
    </div>
  );
}
