import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import throttle from 'lodash.throttle'
import { siteConfig } from '@/lib/config'
import imagesLoaded from 'imagesloaded';
import BlogPost from './BlogPost'
import dynamic from 'next/dynamic'
import NotionPage from '@/components/NotionPage'
import Announcement from './Announcement'
import { useHexoGlobal } from '..' //删掉



const BlogListScroll = props => {
  const { posts, notice, allPages} = props
  const { locale } = useGlobal()
  const [postnum, updatepostnum] = useState(9)
  // let postnum=parseInt(siteConfig('POSTS_PER_PAGE'))

  //删掉这段————————
  // const { showModal, setShowModal, modalContent, setModalContent } = useHexoGlobal()
  // setShowModal(true)
  // setModalContent(posts[2])
  //————————————————

  let hasMore = false
  const postsToShow = posts
    ? Object.assign(posts).slice(0, postnum<8? 8:postnum)
    : []

  if (posts) {
    const totalCount = posts.length
    hasMore = postnum < totalCount
  }
  const handleGetMore = () => {
    //if (!hasMore) return
    updatepostnum(postnum + 3)
  }

  const targetRef = useRef(null)
  const gridRef = useRef(null)
  const masonryRef = useRef(null)

  useEffect(() => {
    console.log(allPages)
    const loadMasonry = async () => {
        const Masonry = (await import('masonry-layout')).default;
        if (gridRef.current && typeof window !== 'undefined') {
            masonryRef.current = new Masonry(gridRef.current, {
                itemSelector: '.grid-item',
                columnWidth: '.grid-sizer',
                gutter: 0,
                percentPosition: true,
                //transitionDuration: '0.8s'
                //initLayout: false,
                // horizontalOrder: true,
            });

            imagesLoaded( gridRef.current ).on( 'progress', function() {
              // layout Masonry after each image loads
              masonryRef.current.layout();
            });
        }
    };
    loadMasonry();
  }, [postsToShow, allPages]);



  // 监听滚动自动分页加载
  const scrollTrigger = useCallback(throttle(() => {
    const scrollS = window.scrollY + window.outerHeight
    const clientHeight = targetRef ? (targetRef.current ? (targetRef.current.clientHeight) : 0) : 0
    
    if (scrollS > clientHeight-100) {
      handleGetMore()
      imagesLoaded( gridRef.current ).on( 'progress', function() {
        // layout Masonry after each image loads
        masonryRef.current.layout();
      });
    }
  }, 200))


    


  useEffect(() => {
    window.addEventListener('scroll', scrollTrigger)

    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  })


  return (
    

      <div ref={targetRef}>
        

        <div className="grid" ref={gridRef}>
          <div className="grid-sizer"></div>
              {postsToShow.map((post, index) => (
                <BlogPost index={index} key={post.id} className="grid-item" post={post} {...props} />
            ))}
        </div>

        <div
            onClick={handleGetMore}
            className="w-full my-4 py-4 text-center cursor-pointer dark:text-gray-500"
        >
            {' '}
            {hasMore ? locale.COMMON.MORE : `${locale.COMMON.NO_MORE} `}{' '}
        </div>

      </div>
  )
}

export default BlogListScroll