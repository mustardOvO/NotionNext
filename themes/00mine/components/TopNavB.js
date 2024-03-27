import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import throttle from 'lodash.throttle'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import { useRouter } from 'next/router'
import { MenuItemDrop } from './MenuItemDrop'

let windowTop = 0

/**
 * 顶部导航
 * @param {*} param0
 * @returns
 */
const TopNav = props => {
  const { customNav, customMenu } = props
  const links = customMenu
  const { locale } = useGlobal()
  const router = useRouter()



  // 监听滚动
  useEffect(() => {
    window.addEventListener('scroll', topNavStyleHandler)
    router.events.on('routeChangeComplete', topNavStyleHandler)
    topNavStyleHandler()
    return () => {
      router.events.off('routeChangeComplete', topNavStyleHandler)
      window.removeEventListener('scroll', topNavStyleHandler)
    }
  }, [])

  const throttleMs = 200

  const topNavStyleHandler = useCallback(throttle(() => {
    const scrollS = window.scrollY
    const nav = document.querySelector('#sticky-nav')
    // 首页和文章页会有头图
    const header = document.querySelector('#header')
    // 导航栏和头图是否重叠
    const scrollInHeader = (scrollS < 10 || scrollS < header?.clientHeight - 50) // 透明导航条的条件

    if (scrollInHeader) {
      // nav && nav.classList.replace('bg-white', 'bg-none')
      nav && nav.classList.replace('border', 'border-transparent')
      nav && nav.classList.replace('drop-shadow-md', 'shadow-none')
      // nav && nav.classList.replace('dark:bg-hexo-black-gray', 'transparent')
    } else {
      // nav && nav.classList.replace('bg-none', 'bg-white')
      nav && nav.classList.replace('border-transparent', 'border')
      nav && nav.classList.replace('shadow-none', 'drop-shadow-md')
      // nav && nav.classList.replace('transparent', 'dark:bg-hexo-black-gray')
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
  const [containerWidth, setContainerWidth] = useState(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        setContainerWidth(width);
      }
    });

    resizeObserver.observe(document.getElementById('flex-container'));

    return () => resizeObserver.disconnect();
  }, []);

  
// ______________________________________________________


  return (<div id='top-nav' className='z-40 w-full object-right bg-none'>

    {/* 导航栏 */}
    <div id='sticky-nav' className="'relative  top-0 fixed p-4  object-center
        dark:text-gray-200 text-black w-full z-20 
        transform duration-300 transition-all'">

      {/* 功能 */}
      <div className=' w-full flex items-center justify-center '>
        <div id="flex-container" className="p-1 w-fit rounded-full backdrop-blur-sm 
                bg-gray-700/10 dark:bg-transparent border border-indigo-300/30 dark:text-gray-200 text-black
                flex gap-2 justify-center items-center transition">
          
          {/* <div > <MenuListTop {...props} /></div> */}

            {links?.map((link, index) => link && link.show && <MenuItemDrop  key={index} link={link} />)}

          <Logo {...props} />
        
        </div>
      </div>



    </div>

  </div>)
}

export default TopNav
