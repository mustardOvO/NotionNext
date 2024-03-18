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
    return <div className='my-8' />
  }

  //const headerImage = post?.pageCover ? post.pageCover : siteInfo?.pageCover
  const headerImage = post?.pageCover ? post.pageCover : siteInfo?.pageCover

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

  return (
    <div id="header" className="w-full sm:h-60 md:h-96 relative md:flex-shrink-0 z-10" >
      {isVideo(headerImage) ?
          <video muted playsinline loop autoplay  src={headerImage} id="video" ref={videoRef} className=' w-full h-full object-center object-cover'>
          </video>

          : <LazyImage src={headerImage} className=' w-full  h-full object-center object-cover' />
        }
      {/* <LazyImage priority={true} src={headerImage} className='w-full h-full object-cover object-center absolute top-0' /> */}

      <header id='article-header-cover'
        className="bg-black bg-opacity-70 absolute top-0 w-full h-full flex justify-center items-center ">

        <div className=' '>
          {/* <div className='mb-3 flex justify-center'>
            {post.category && <>
              <Link href={`/category/${post.category}`} passHref legacyBehavior>
                <div className="cursor-pointer px-2 py-1 mb-2 border rounded-sm dark:border-white text-sm font-medium hover:underline duration-200 shadow-text-md text-white">
                  {post.category}
                </div>
              </Link>
            </>}
          </div> */}

          {/* 文章Title */}
          <div className="font-bold sm:text-4xl md:text-5xl text-4xl shadow-text-md flex justify-center text-center text-white">
            {/* <NotionIcon icon={post.pageIcon} className='text-4xl mx-1' /> */}
            {post.title}
          </div>
          <div className="font-light text-sm text-center text-4xl shadow-text-md mt-3 text-center text-white text-opacity-65">
            {formatDateFmt(post?.publishDate, 'yyyy-MM')}
          </div>


          {/* //发布时间 更新时间 
          <section className="flex-wrap shadow-text-md flex text-sm justify-center mt-4 text-white dark:text-gray-400 font-light leading-8">      
            <div className='flex justify-center dark:text-gray-200 text-opacity-70'>
              {post?.type !== 'Page' && (
                <>
                  <Link
                    href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
                    passHref
                    className="pl-1 mr-2 cursor-pointer hover:underline">

                    {locale.COMMON.POST_TIME}: {post?.publishDay}

                  </Link>
                </>
              )}
              <div className="pl-1 mr-2">
                {locale.COMMON.LAST_EDITED_TIME}: {post.lastEditedDay}
              </div>
            </div>

            {JSON.parse(siteConfig('ANALYTICS_BUSUANZI_ENABLE')) && <div className="busuanzi_container_page_pv font-light mr-2">
              <span className="mr-2 busuanzi_value_page_pv" />
              {locale.COMMON.VIEWS}
            </div>}
          </section>*/}

          <div className='mt-4 mb-1'>
            {post.tagItems && (
              <div className="flex justify-center flex-nowrap overflow-x-auto gap-1">
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
