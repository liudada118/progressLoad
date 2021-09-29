import React, { useRef, useEffect } from 'react'
import A from '../../assets/image/billboards_thumbs/billboards_thumbs_01.png'
import B from '../../assets/image/billboards_thumbs/billboards_thumbs_02.png'
import F from '../../assets/image/instructor_thumbs/instructor_thumbs_01.png'
import G from '../../assets/image/instructor_thumbs/instructor_thumbs_02.png'
import H from '../../assets/image/instructor_thumbs/instructor_thumbs_03.png'
import I from '../../assets/image/instructor_thumbs/instructor_thumbs_04.png'
import J from '../../assets/image/jump_back_to_thumb/sample_thumb.png'
import Close from '../../assets/image/Close.png'
import closeHover from '../../assets/image/closeHover.png'
import Swiper from '../common/swiper/Swiper'
import Swiper1 from '../common/swiper1/Swiper1'
import './billboard.css'
import header from '../../assets/image/header.png'
import footer from '../../assets/image/footer.png'
import { height, initTime, deleteTime } from '../../assets/config/config'


let fisrtClose = false
let closeNum = 1
/**
 * 配置文件
 * */
const imagesArr = [
  {
    info: 'Training Programs',
    images: [A, B],
    close: true,
    view: 1.3,
    // height: 600
  }, {
    info: 'Your Favorite Instructors',
    images: [F, G, H, I],
    close: true
  }, {
    info: 'Jumping Back In',
    images: [J, J, J, J],
    close: false
  }]


export default function Billboard() {
  const transArr = new Array(3).fill(0)
const heightArr = [800, 373, 373]


  const windowHeight = window.innerHeight
  const windowWidth = window.innerWidth
  const content = useRef()
  const head = useRef()
  const foot = useRef()

  // 
  const CloseItem = (index) => {
    const heiget1 = windowHeight - (184 + 248) * windowWidth / 3840
    let length = content.current.childNodes.length
    content.current.childNodes[index].style.opacity = 0
    content.current.childNodes[index].style.transition = `opacity ${deleteTime}s ease-in-out`


    // 初始化每个item的偏移量

    setTimeout(() => {
      content.current.childNodes[index].style.visibility='hidden';
      for (let i = index, j = 0; i < length; i++, j++) {
        // 计算每个item偏移的量

        transArr[i] -= heightArr[index]
        content.current.childNodes[i].style.transform = `translateY(${transArr[i]}px)`
        content.current.childNodes[i].style.transition = `transform ${deleteTime + j}s ease-in-out`
      }
      
      closeNum++
    }, [deleteTime * 1000])
  }




  /**
   * 加载进来的动画
   * */
  useEffect(() => {
    imagesArr.forEach((a, index) => {
      if (index == 0) {
        setTimeout(() => {
          content.current.childNodes[index].style.opacity = 1
          content.current.childNodes[index].style.transform = 'translateY(0px)';
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
    console.log(document.querySelector('.contentItem1 img').getBoundingClientRect().height)
    content.current.childNodes[0].style.height = window.innerHeight - head.current.clientHeight - foot.current.clientHeight
    console.log(window.innerHeight - head.current.clientHeight - foot.current.clientHeight)
    const nextWidth = windowWidth - document.querySelector('#bill .swiper-slide-next').getBoundingClientRect().left
    document.querySelector('#bill .swiper-button-next').style.width = `${nextWidth}px`
    document.querySelector('#bill .swiper-button-prev').style.width = `${nextWidth}px`
    
    document.querySelector('#bill .swiper-button-next').style.opacity = 0
    document.querySelector('#bill .swiper-button-prev').style.opacity = 0

  }, [])

  // 左右导航显示
  const navShow = () => {
    document.querySelector('#bill .swiper-button-prev').style.height =`${document.querySelector('.contentItem1 img').getBoundingClientRect().height}px`
    document.querySelector('#bill .swiper-button-next').style.height = `${document.querySelector('.contentItem1 img').getBoundingClientRect().height}px`
    document.querySelector('#bill .swiper-button-next').style.top = `${-document.querySelector('.swiper-slide').getBoundingClientRect().top + document.querySelector('.contentItem1 img').getBoundingClientRect().top + 20}px`
    document.querySelector('#bill .swiper-button-prev').style.top = `${-document.querySelector('.swiper-slide').getBoundingClientRect().top + document.querySelector('.contentItem1 img').getBoundingClientRect().top+ 20}px`
    if (document.querySelector('#bill .swiper-button-next:not(.swiper-button-disabled)')) document.querySelector('#bill .swiper-button-next:not(.swiper-button-disabled)').style.opacity = 1
    if (document.querySelector('#bill .swiper-button-prev:not(.swiper-button-disabled)')) document.querySelector('#bill .swiper-button-prev:not(.swiper-button-disabled)').style.opacity = 1

  }


  // 左右导航隐藏
  const navHidden = () => {
    document.querySelector('#bill .swiper-button-next').style.opacity = 0
    document.querySelector('#bill .swiper-button-prev').style.opacity = 0
  }

  return (
    <div>
      <div className="title" ref={head}>
        <img src={header} alt="" />
      </div>
      <div className='bill' id='bill' ref={content}>
        {
          imagesArr.map((item, index) => {
            return (
              <div className="contentItem1" style={index ==0 ? {height: '800px'} : null}>
                <div className={index === 0 ? "itemInfo" : 'item1Info'}>
                  <p className='font'>{item.info}</p>
                  {item.close ? <i className='iconfont close' onClick={() => { CloseItem(index) }}>&#xe61a;</i> : null}
                </div>
                <div className="item1Content" onMouseOver={index == 0 ? navShow : null} onMouseOut={index === 0 ? navHidden : null}
                  style={index != 0 ? { height: '100%' } : { height: '100%' }}>
                  {item.view ? <Swiper1 images={item.images} view={item.view} /> : <Swiper images={item.images} />}
                </div>
              </div>
            )
          })
        }
      </div>
      <img ref={foot} className='footer' src={footer} alt="" />
    </div>
  )
}
