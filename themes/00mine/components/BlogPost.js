import { compressImage } from '@/lib/notion/mapImage'
import Link from 'next/link'
import { useHexoGlobal } from '..'
import { useCallback, useEffect, useRef, useState } from 'react'
import { isMobile } from '@/lib/utils'
import LazyImage from '@/components/LazyImage'


/**
 * 博客照片卡牌
 * @param {*} props
 * @returns
 */
const BlogPost = (props) => {
  const { post, index, siteInfo } = props
  const pageThumbnail = compressImage(post?.pageCoverThumbnail || siteInfo?.pageCover)
  //const pageThumbnail = post?.pageCoverThumbnail || siteInfo?.pageCover
  const { setModalContent, setShowModal } = useHexoGlobal()
  const handleClick = () => {
    setShowModal(true)
    setModalContent(post)
  }

  // 实现动画 一个接一个出现
  let delay = index * 100
  if (isMobile()) {
    delay = 0
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



  return (
    <div
      onClick={handleClick}
      data-aos-delay={`${delay}`}
      data-aos-offset="-1000"
      data-aos="fade-up"
      data-aos-duration="300"
      data-aos-once="false"
      data-aos-anchor-placement="top-bottom"
      key={post?.id}
      //display-order="0"
      //class="grid-item"
      className='grid-item cursor-pointer w-full rounded-lg relative'>

      <div className="w-auto bg-hexo-light-gray dark:bg-hexo-black-gray min-h-20 rounded-lg m-2 relative overflow-clip ">
        {isVideo(pageThumbnail) ?
          <video muted playsinline loop autoplay ref={videoRef} src={pageThumbnail} id="video" className=' w-full object-cover'>
          </video>

          : <LazyImage src={pageThumbnail} className=' w-full object-cover' />
        }

        <h2 className="font-medium w-full bg-black bg-opacity-25 backdrop-blur-sm  text-md absolute left-0 bottom-0 p-4  text-white dark:text-gray-100">
          {/* <NotionIcon icon={post.pageIcon} />  */}
          {post?.title}
          <div></div>

        </h2>

        {/* 文章tag */}
        <div className="flex absolute left-0 top-0 m-2">
          {post.tagItems?.map(tag => (
            <div className='px-2 py-1 mx-1 text-xs rounded-lg bg-white bg-opacity-40 hover:bg-black dark:hover:bg-black text-dark-700 hover:text-white duration-200'>
              {tag.name}
            </div>
          ))}
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
