import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import './swiper1.css'
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
SwiperCore.use([Navigation]);


/**
 * thumb的hover误触碰时间   单位毫秒
 * 默认是700ms
 * */ 

export default function Iswiper(props) {
  return (
    <div className='swiper' style={{height : '100%'}}>
      <Swiper
        spaceBetween={70}
        slidesPerView={props.view}
        navigation
        onSlideChange={(swiper) => console.log(swiper.activeIndex)}
        onSwiper={(swiper) => console.log(swiper.activeIndex)}
      >
        {
          props.images.map((img, index) => {
            return (<SwiperSlide key={index}
              className='itemScale' 
              >
              <img src={img} className='swiperImg' alt="" /> </SwiperSlide>)
          })
        }
      </Swiper>
    </div>
  )
}
