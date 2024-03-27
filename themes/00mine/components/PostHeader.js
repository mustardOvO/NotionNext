import Link from 'next/link'
import TagItemMini from './TagItemMini'
import { useGlobal } from '@/lib/global'
import NotionIcon from '@/components/NotionIcon'
import LazyImage from '@/components/LazyImage'
import { formatDateFmt } from '@/lib/formatDate'
import { siteConfig } from '@/lib/config'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function PostHeader({ post, siteInfo }) {
  const { locale, fullWidth } = useGlobal()

  if (!post) {
    return <></>
  }

  // 文章全屏隐藏标头
  if (fullWidth) {
    return 
    
  }

  //const headerImage = post?.pageCover ? post.pageCover : siteInfo?.pageCover
  const headerImage = post?.pageCover ? post.pageCover : siteInfo?.pageCover

  function getFileExtension(url) {// 提取 URL 中的文件扩展名
    const path = url.split('?')[0]; // 移除查询字符串和片段标识符
    const parts = path.split('.');

    return parts.pop().toLowerCase(); // 返回文件扩展名，并转换为小写
  }

  // 处理是否视频————————————————————
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
  // 处理是否视频————————————————————

  return (
    <div id="header" className="w-full min-h-72 md:min-h-96 relative md:flex-shrink-0 z-10" >
      {isVideo(headerImage) ?
          <video muted playsinline loop autoplay  src={headerImage} id="video" ref={videoRef} className='absolute w-full h-full object-center object-cover'>
          </video>

          : <LazyImage src={headerImage} className='absolute  w-full  h-full object-center object-cover' />
        }
      {/* <LazyImage priority={true} src={headerImage} className='w-full h-full object-cover object-center absolute top-0' /> */}

      <header id='article-header-cover'
        className="bg-black bg-opacity-70 absolute top-0 pt-16 pb-8 w-full h-full flex justify-center items-center ">

        <div className=' '>

          {/* 文章Title */}
          <div className="font-bold text-2xl sm:text-4xl md:text-5xl  shadow-text-md flex justify-center text-center text-white">
            {/* <NotionIcon icon={post.pageIcon} className='text-4xl mx-1' /> */}
            {post.title}
          </div>
          <div className="font-light text-sm text-center text-4xl shadow-text-md mt-3 text-center text-white text-opacity-65">
            {formatDateFmt(post?.publishDate, 'yyyy-MM')}
          </div>

          <div className='mt-4 mb-1'>
            {post.tagItems && (
              <div className="flex justify-center flex-wrap overflow-x-auto gap-1">
                {post.tagItems.map(tag => (
                  <TagItemMini key={tag.name} tag={tag} /> 
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  )
}
