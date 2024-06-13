import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import throttle from 'lodash.throttle'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import { useRouter } from 'next/router'
import { MenuItemDrop } from './MenuItemDrop'
import { debounce } from 'lodash';
import { isMobile } from '@/lib/utils'
import DarkModeButton from '@/components/DarkModeButton'

let windowTop = 0

/**
 * 顶部导航
 * @param {*} param0
 * @returns
 */
const TopNav = props => {
  const { customNav, customMenu } = props
  const links = customMenu
  const { locale, isDarkMode, toggleDarkMode } = useGlobal()
  const router = useRouter()



  // 监听滚动
  useEffect(() => {
    topNavStyleHandler()
    window.addEventListener('scroll', topNavStyleHandler)
    router.events.on('routeChangeComplete', topNavStyleHandler)
    
    return () => {
      router.events.off('routeChangeComplete', topNavStyleHandler)
      window.removeEventListener('scroll', topNavStyleHandler)
    }
  }, [router])

  const throttleMs =  200

  const topNavStyleHandler = useCallback(throttle(() => {
    const scrollS = window.scrollY
    const nav = document.querySelector('#sticky-nav')
    // 首页和文章页会有头图
    const header = document.querySelector('#header')
    // 导航栏和头图是否重叠
    const scrollInHeader = (header && scrollS <= header?.clientHeight) // 与头图重合-强制dark mode

    if (scrollInHeader) {
      // nav && nav.classList.remove('light')
      nav && nav.classList.add('dark')
      nav && nav.classList.replace('light','dark')

      // console.log('in')
    } else {
      nav && nav.classList.remove('dark')
      nav && nav.classList.add('light')
      // console.log('out')

    }

    if (scrollInHeader) {
      nav && nav.classList.replace('text-black', 'text-white')
    } else {
      nav && nav.classList.replace('text-white', 'text-black')
    }

    // 导航栏不在头图里，且页面向下滚动一定程度 隐藏导航栏
    const showNav = scrollS <= windowTop || scrollS < 5 || (header && scrollS <= header.clientHeight + 100)
    if (!showNav) {
      nav && nav.classList.replace('top-0', '-top-20')
      windowTop = scrollS
    } else {
      nav && nav.classList.replace('-top-20', 'top-0')
      windowTop = scrollS
    }
  }, throttleMs)
  )
  

  //导航icon缩放
  const containerRef = useRef(null);

  const handleMouseOver = debounce((e) => {
    const container = document.getElementById('nav-container');
    const containerRect = container.getBoundingClientRect();
    const mouseX = e.clientX;

    if (!isMobile()) {
      const elements = document.querySelectorAll('.nav-item');
      elements.forEach(element => {
        const elementRect = element.getBoundingClientRect();
        const distance = Math.max(2, 0.1 * Math.abs(mouseX - (elementRect.left + elementRect.width / 2)));
        const newSize = 40 + (30 / distance); // Adjust the scaling factor as needed
        element.style.width = newSize + 'px';
        element.style.height = newSize + 'px';
      });
    }
  }, 10);

  const handleMouseLeave = () => {
    const elements = document.querySelectorAll('.nav-item');
    elements.forEach(element => {
      element.style.height = '2.5rem';
      element.style.width = '2.5rem';
    });
  };


  // ______________________________________________________


  return (<div id='top-nav' className='z-40 w-full object-right bg-none'>

    {/* 导航栏 */}
    <div id='sticky-nav' className="'relative  top-0 fixed p-4  object-center
        dark:text-gray-200 text-black w-full z-20 
        transform duration-300 transition-all'">

      <div className=' w-full h-min flex items-center justify-center '>
        {/* 按钮容器 */}
        <div id="nav-container" className="p-1  rounded-full backdrop-blur-sm 
                bg-gray-700/10 dark:bg-black/30 border border-indigo-300/30 dark:border-indigo-300/10 dark:text-gray-200 
                flex  gap-2 justify-center items-center overflow-visible
                hover:h-12 sm:hover:p-2 sm:hover:h-[72px] transition-all duration-200"
          onMouseMove={handleMouseOver} onMouseLeave={handleMouseLeave} ref={containerRef}>

          {links?.map((link, index) => link && link.show && <MenuItemDrop key={index} link={link} />)}
          <div className="w-px h-6 bg-slate-400/20 dark:bg-slate-300/10"></div>

          <DarkModeButton  />

          <Logo {...props} />

        </div>
      </div>



    </div>

  </div>)
}

export default TopNav
