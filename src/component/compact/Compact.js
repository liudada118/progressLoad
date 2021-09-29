import React, { useRef, useState, useEffect } from 'react'
import './compact.css'
import Close from '../../assets/image/Close.png'
import closeHover from '../../assets/image/closeHover.png'
import Swiper from '../common//swiper/Swiper'
import A from '../../assets/image/trainingProgram_thumbs/trainingProgram_thumbs_01.png'
import B from '../../assets/image/trainingProgram_thumbs/trainingProgram_thumbs_02.png'
import C from '../../assets/image/trainingProgram_thumbs/trainingProgram_thumbs_03.png'
import D from '../../assets/image/trainingProgram_thumbs/trainingProgram_thumbs_04.png'
import E from '../../assets/image/trainingProgram_thumbs/trainingProgram_thumbs_05.png'
import F from '../../assets/image/instructor_thumbs/instructor_thumbs_01.png'
import G from '../../assets/image/instructor_thumbs/instructor_thumbs_02.png'
import H from '../../assets/image/instructor_thumbs/instructor_thumbs_03.png'
import I from '../../assets/image/instructor_thumbs/instructor_thumbs_04.png'
import J from '../../assets/image/jump_back_to_thumb/sample_thumb.png'
import Header from '../../component/common/footHerder/Header'
import { height, initTime, deleteTime } from '../../assets/config/config'



 
/*
 * thumb的hover误触碰时间   单位毫秒
 * 通过 Swiper组件的 hoverTime 传过去 ，默认是700ms
 * */


/**
 * 页面元素配置
 * */
const imagesArr = [
  {
    info: 'Training Programs',
    images: [A, B, C, D, E],
    close: true,
    view: 4
  }, {
    info: 'Your Favorite Instructors',
    images: [F, G, H, I],
    close: true
  }, {
    info: 'Jumping Back In',
    images: [J, J, J, J],
    close: false
  }]



export default function Compact() {
//删除动画每个item的偏移量初始化
  const transArr = new Array(3).fill(0)

// 每个元素的高度  删除动画会用到
const heightArr = [373, 373, 373]


  const content = useRef()
  const windowHeight = window.innerHeight
  const windowWidth = window.innerWidth

  /**Deleting-Animation**/
  const CloseItem = (index) => {
    console.log(content)
    let length = content.current.childNodes.length
    content.current.childNodes[index].style.opacity = 0
    content.current.childNodes[index].style.transition = `opacity ${deleteTime}s ease-in-out`



    setTimeout(() => {
      content.current.childNodes[index].style.visibility='hidden';
      for (let i = index, j = 0; i < length; i++, j++) {

        transArr[i] -= heightArr[index]
        content.current.childNodes[i].style.transform = `translateY(${transArr[i]}px)`
        content.current.childNodes[i].style.transition = `transform ${deleteTime + j}s ease-in-out`
      }


    }, [deleteTime * 1000])

  }


  /**
   * 加载进来的动画
   * */
  useEffect(() => {

    console.log(content)
    imagesArr.forEach((a, index) => {
      if (index == 0) {
        setTimeout(() => {
          content.current.childNodes[index].style.opacity = 1
          content.current.childNodes[index].style.transform = 'translateY(0)';
          content.current.childNodes[index].style.transition = `all ${initTime}s ease-in-out`
        }, 1)
      } else {
        setTimeout(() => {
          content.current.childNodes[index].style.opacity = 1
          content.current.childNodes[index].style.transform = 'translateY(0)';
          content.current.childNodes[index].style.transition = `all ${initTime}s ease-in-out`
        }, 400);
      }

    })
  }, [])


  // 设置阴影左右导航的大小
  useEffect(() => {
    console.log(document.querySelector('#compactContent .swiper-container .swiper-wrapper').childNodes[4].getBoundingClientRect())
    const nextWidth = windowWidth - document.querySelector('#compactContent .swiper-container .swiper-wrapper').childNodes[4].getBoundingClientRect().left
    document.querySelector('#compactContent .swiper-button-next').style.width = `${nextWidth}px`
    // document.querySelector('#compactContent .swiper-button-next').style.height = `${nextWidth}px`
    document.querySelector('#compactContent .swiper-button-prev').style.width = `${nextWidth}px`
    // document.querySelector('#compactContent .swiper-button-prev').style.height = `${nextWidth}px`
    document.querySelector('#compactContent .swiper-button-next').style.opacity = 0
    document.querySelector('#compactContent .swiper-button-prev').style.opacity = 0
  })

  // 左右导航显示
  const navShow = () => {
    if (document.querySelector('#compactContent .swiper-button-next:not(.swiper-button-disabled)')) document.querySelector('#compactContent .swiper-button-next:not(.swiper-button-disabled)').style.opacity = 1
    if (document.querySelector('#compactContent .swiper-button-prev:not(.swiper-button-disabled)')) document.querySelector('#compactContent .swiper-button-prev:not(.swiper-button-disabled)').style.opacity = 1

  }


  // 左右导航隐藏
  const navHidden = () => {
    document.querySelector('#compactContent .swiper-button-next').style.opacity = 0
    document.querySelector('#compactContent .swiper-button-prev').style.opacity = 0
  }

  return (
    <div className='compactItem'>
      <Header>
        <div className="content" id='compactContent' ref={content}>
          {imagesArr.map((item, index) => {
            return (
              <div className="contentItem1" >
                <div className="item1Info">
                  <p className='font'>{item.info}</p>
                  {
                    item.close ? <i className='iconfont close' onClick={() => { CloseItem(index) }}>&#xe61a;</i> : null
                  }
                </div>
                <div className="item1Content" key={index} onMouseOver={index == 0 ? navShow : null} onMouseOut={index === 0 ? navHidden : null}>
                  {item.view ? <Swiper images={item.images} view={item.view} /> : <Swiper images={item.images} />}
                </div>
              </div>
            )
          })}
        </div>
      </Header>
    </div>
  )
}
