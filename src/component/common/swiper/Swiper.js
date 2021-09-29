import React, { useRef, useState ,useEffect} from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import './swiper.css'
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import Left from '../../../assets/image/icon/arrow_compact.png'
let timer
SwiperCore.use([Navigation]);


/**
 * 该组件为显示4个item的轮播图
 * 
 * 组件用法 <Swiper images={imageArr} hoverTime={700} view={4} />
 * */ 

/**
 * thumb的hover误触碰时间   单位毫秒
 * 默认是700ms
 * */ 

Iswiper.defaultProps = {
  hoverTime : 0,
  view : 4
}

export default function Iswiper(props) {
  const [index, setIndex] = useState(0)
  const swiperRef = useRef()


  /**
   * 当鼠标点进之后设置定时器，在hoverTime秒之内一直都在元素上面的化就执行方法逻辑
   * 
   * 
   * swiperRef.current.childNodes[swiperRef.current.childNodes.length-1].childNodes[e]
   * 这里执行的相当于原生的代理事件，想要监听多个元素的话，直接监听父元素，然后去根据传进来的index去寻找对应的子元素
   * */ 
  const mouseOver = (e) => {
    swiperRef.current.childNodes[swiperRef.current.childNodes.length-1].childNodes[e].style.boxShadow = '0 0 15px #aaa'
    swiperRef.current.childNodes[swiperRef.current.childNodes.length-1].childNodes[e].style.transition = 'box-shadow 0.2s ease-in-out'
  }

  /**
   * 当鼠标溢出元素外，删除定时器，不执行任何事情
   * */ 
  const mouseOut = (e) => {
    swiperRef.current.childNodes[swiperRef.current.childNodes.length-1].childNodes[e].style.boxShadow = '0 0 0px #ddd'
    swiperRef.current.childNodes[swiperRef.current.childNodes.length-1].childNodes[e].style.transition = 'box-shadow 0.2s ease-in-out'
  }


  return (
    <div className='swiper' >
      <Swiper
        spaceBetween={40}
        slidesPerView={props.view}
        
        navigation={props.images.length > props.view ? true : false} // {/* 当元素个数大于4的时候出现左右导航 */}
        onSlideChange={(swiper) => console.log(swiper.activeIndex)}
        onSwiper={(swiper) => console.log(swiper.activeIndex)}
        ref={swiperRef}
      > 
        {
          props.images.map((img, index) => {
            return (<SwiperSlide key={index}
              className='itemScale' 
              onMouseOver={() => { mouseOver(index) }} onMouseOut={() => { mouseOut(index) }}
              >
              <img src={img} className='swiperImg' alt="" /> </SwiperSlide>)
          })
        }
      </Swiper>
    </div>
  )
}
