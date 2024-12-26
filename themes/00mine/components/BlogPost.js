import { compressImage } from '@/lib/notion/mapImage'
import Link from 'next/link'
import { useHexoGlobal } from '..'
import { useCallback, useEffect, useRef, useState } from 'react'
import { isMobile } from '@/lib/utils'
import LazyImage from '@/components/LazyImage'
import TagItemMini from './TagItemMini'
import { checkContainHttp, sliceUrlFromHttp } from '@/lib/utils'
import { siteConfig } from '@/lib/config'



/**
 * 博客照片卡牌
 * @param {*} props
 * @returns
 */
const BlogPost = (props) => {
  const { post, index, siteInfo } = props
  const pageThumbnail = compressImage(post?.pageCoverThumbnail || siteInfo?.pageCover)
  const url = checkContainHttp(post.slug) ? sliceUrlFromHttp(post.slug) : `${siteConfig('SUB_PATH', '')}/${post.slug}`
  const { setModalContent, setShowModal } = useHexoGlobal()
  const handleClick = () => {
    setShowModal(true)
    setModalContent(post)
  }


  function getFileExtension(url) {// 提取 URL 中的文件扩展名
    const path = url.split('?')[0]; // 移除查询字符串和片段标识符
    const parts = path.split('.');

    return parts.pop().toLowerCase(); // 返回文件扩展名，并转换为小写
  }

  function isVideo(url) {
    const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'webm'];
    const fileExtension = getFileExtension(url);
    return videoExtensions.includes(fileExtension);
  }



  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // 视频元素可见时触发回调
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    if (video) {
      observer.observe(video);
    }

    return () => {
      if (video) {
        observer.unobserve(video);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (isVisible && video) {
      video.play().catch((error) => {
        console.error('Failed to play the video:', error);
      });
    }
  }, [isVisible]);

  const fadeInRef = useRef(null);
  const translateRef = useRef(null);
  // const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (fadeInRef.current) {
        const top = fadeInRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight*0.95) {
          fadeInRef.current.style.opacity = 1;
          translateRef.current.style.height = '0px'; 
        }
        else{
          fadeInRef.current.style.opacity = 0;
          // translateRef.current.style.height = '50px';
          
        }
      }
    };
    window.addEventListener('load', handleScroll);
    window.addEventListener('resize', handleScroll);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);


  return (
    <div


      key={post?.id}
      ref={fadeInRef} 
      className={`grid-item  w-full rounded-lg relative 
      transition-all duration-800 ease-in`}
      // style={{ opacity: 0, transform: 'translateY(20px)' }}
      >
        <div ref={translateRef}
         className='h-0 transition-all duration-800 ease-in'>

        </div>

      <div className="w-auto bg-hexo-light-gray dark:bg-hexo-black-gray border dark:border-gray-800 min-h-20 rounded-lg m-1 relative overflow-clip "
      // style={{ opacity: 0.5, transform: 'translateY(20px)' }}
      >
        <div
          onClick={handleClick} className='cursor-pointer'>

          {isVideo(pageThumbnail) ?
            <video muted playsinline loop autoplay ref={videoRef} src={pageThumbnail} id="video" className='w-full object-cover'>
            </video>

            : <LazyImage src={pageThumbnail} className='w-full object-cover' />
            
          }
          <div className="w-full h-28 bg-gradient-to-t from-[#00000077] via-[#00000033] backdrop-blur-0 absolute left-0 bottom-0" ></div>
        </div>

        <h2 className="font-medium text-md absolute left-0 bottom-0 p-4 text-white dark:text-gray-100">
          {/* <NotionIcon icon={post.pageIcon} />  */}
          <Link href={url} passHref legacyBehavior>
            {post?.title}
          </Link>

          <div></div>

        </h2>

        {/* 文章tag */}
        <div className="flex absolute left-0 top-0 m-4">
          {post.tagItems && (
            <div className="flex  flex-wrap overflow-x-auto  ">
              {post.tagItems.map(tag => (
                <TagItemMini key={tag.name} tag={tag} />
              ))}
            </div>
          )}

        </div>


        {/* {post?.category && <div className=' text-xs rounded-lg absolute left-0 top-0 m-4 px-2 py-1 bg-white bg-opacity-40 hover:bg-black dark:hover:bg-black text-dark-700 hover:text-white duration-200'>
          <Link href={`/category/${post?.category}`}>
            {post?.category}
          </Link>
          
        </div>} */}
      </div>

    </div>


  )
}

export default BlogPost
