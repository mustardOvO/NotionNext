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
  // const handleMouseEnter = () => {
  //   const elements = document.querySelectorAll('.nav-item');
  //   elements.forEach(element => {
  //     element.style.height = '4rem';
  //     element.style.width = '4rem';
  //   });
  // };
  const [hoveredElementSize, setHoveredElementSize] = useState(100);
  const containerRef = useRef(null);

  // const handleMouseOver = (e) => {
  //   const elementId = e.target.id;
  //   const updatedChildElements = childElements.map((child) => {
  //     const newSize = elementId === `child-${child.id}` ? 150 : 100; // Adjust sizes as needed
  //     return { ...child, size: newSize };
  //   });
  //   setChildElements(updatedChildElements);
  // };

  // const handleMouseMove = debounce((e) => {
  //   setChildElements(prevChildElements => {
  //     const mouseX = e.clientX;
  //     const mouseY = e.clientY;
  //     const updatedChildElements = prevChildElements.map((child) => {
  //       const element = document.getElementById(`child-${child.id}`);
  //       const rect = element.getBoundingClientRect();
  //       const distance = Math.sqrt(Math.pow(mouseX - rect.left, 2) + Math.pow(mouseY - rect.top, 2));
  //       const newSize = 200 - distance * 0.5; // Adjust scaling factor as needed
  //       return { ...child, size: newSize };
  //     });
  //     return updatedChildElements;
  //   });
  // }, 10); // Adjust debounce delay as needed

  const handleMouseOver =  debounce((e) => {
    const container = document.getElementById('nav-container');
    const containerRect = container.getBoundingClientRect();
    const mouseX = e.clientX;

    const elements = document.querySelectorAll('.nav-item');
    elements.forEach(element => {
      const elementRect = element.getBoundingClientRect();
      const distance = Math.max(2,0.1*Math.abs(mouseX - (elementRect.left + elementRect.width / 2)));
      const newSize = 40 + (30 / distance ); // Adjust the scaling factor as needed
      element.style.width = newSize + 'px';
      element.style.height = newSize + 'px';
    });
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
        {/* 按钮 */}
        <div id="nav-container" className="p-1  rounded-full backdrop-blur-sm 
                bg-gray-700/10 dark:bg-black/30 border border-indigo-300/30 dark:border-indigo-300/10 dark:text-gray-200 text-black
                flex  gap-2 justify-center items-center
                hover:p-2 hover:h-[72px] transition-all duration-200" 
                onMouseMove={handleMouseOver} onMouseLeave={handleMouseLeave} ref={containerRef}>
          
          {/* <div > <MenuListTop {...props} /></div> */}

            {links?.map((link, index) => link && link.show && <MenuItemDrop key={index} link={link} />)}

          <Logo {...props} />
        
        </div>
      </div>



    </div>

  </div>)
}

export default TopNav
