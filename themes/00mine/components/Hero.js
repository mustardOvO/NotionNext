// import Image from 'next/image'
import { useEffect, useState } from 'react'
import Typed from 'typed.js'
import CONFIG from '../config'
import NavButtonGroup from './NavButtonGroup'
import { useGlobal } from '@/lib/global'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'

let wrapperTop = 0

/**
 * 顶部全屏大图
 * @returns
 */
const Hero = props => {
  const [typed, changeType] = useState()
  const { siteInfo } = props
  const { locale } = useGlobal()
  const scrollToWrapper = () => {
    window.scrollTo({ top: wrapperTop, behavior: 'smooth' })
  }
  const GREETING_WORDS = siteConfig('GREETING_WORDS').split(',')
  useEffect(() => {
    updateHeaderHeight()

    if (!typed && window && document.getElementById('typed')) {
      changeType(
        new Typed('#typed', {
          strings: GREETING_WORDS,
          typeSpeed: 100,
          backSpeed: 100,
          backDelay: 400,
          
          showCursor: false,
          initFadeOut: true
        })
      )
    }

    window.addEventListener('resize', updateHeaderHeight)
    return () => {
      window.removeEventListener('resize', updateHeaderHeight)
    }
  })

  function updateHeaderHeight() {
    requestAnimationFrame(() => {
      const wrapperElement = document.getElementById('wrapper')
      wrapperTop = wrapperElement?.offsetTop
    })
  }

  return (
        <header
            id="header" style={{ zIndex: 1 }}
            className="w-full h-screen relative bg-black"
        >

            <div className=" absolute flex flex-col h-full items-center mt-20 mb-8 sm:mt-0 sm:items-top justify-top sm:justify-center w-full ">
                {/* 站点标题 */}
                <div className='font-hero font-medium text-2xl sm:text-4xl text-[#ebe19fcc] tracking-wide'>
                  {siteConfig('TITLE')}
                  {/* MustardO<a className="font-[Glory]">v</a>O */}
                  {/* MustardOvO */}
                </div>
                {/* 站点欢迎语 */}
                <div className='font-[ZoomlaMengyas-A080] text-[#dbe6c9] tracking-wide mt-8 mb-12 items-top text-center text-5xl sm:text-7xl '>
                    {/* <span id='typed' /> */}
                    芥末味汽水<a className="md:text-5xl text-3xl"> 儿</a> 
                </div>

                {/* 首页导航大按钮 */}
                {siteConfig('HEXO_HOME_NAV_BUTTONS', null, CONFIG) && <NavButtonGroup {...props} />}

                {/* 滚动按钮 */}
                {/* <div onClick={scrollToWrapper} className="z-10 cursor-pointer w-full text-center py-4 text-3xl absolute bottom-10 text-white">
                    <div className="opacity-70 animate-bounce text-xs">{siteConfig('HEXO_SHOW_START_READING', null, CONFIG) && locale.COMMON.START_READING}</div>
                    <i className='opacity-70 animate-bounce fas fa-angle-down' />
                </div> */}
            </div>

            <LazyImage id='header-cover' src={siteInfo?.pageCover}
                className={`header-cover w-full h-screen object-cover object-center ${siteConfig('HEXO_HOME_NAV_BACKGROUND_IMG_FIXED', null, CONFIG) ? 'fixed' : ''}`} />

        </header>
  )
}

export default Hero
