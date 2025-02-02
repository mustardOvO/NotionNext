
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { getQueryParam, getQueryVariable, isBrowser } from '@/lib/utils'
import Link from 'next/link'
import BlogPost from './BlogPost'
import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '@/lib/config'
//import imagesLoaded from 'imagesloaded';
import dynamic from 'next/dynamic'
// const Masonry = dynamic(() => import('masonry-layout'), {
//     ssr: false
//   });
//import Masonry from 'masonry-layout';


const BlogListPage = props => {
  const { page = 1, posts, postCount } = props
  const { locale } = useGlobal()
  const router = useRouter()
  const totalPage = Math.ceil(postCount / parseInt(siteConfig('POSTS_PER_PAGE')))
  const currentPage = +page

  const showPrev = currentPage > 1
  const showNext = page < totalPage
  const pagePrefix = router.asPath.split('?')[0].replace(/\/page\/[1-9]\d*/, '').replace(/\/$/, '')

  const blogPostRefs = useRef([])
  const gridRef = useRef(null);
  const masonryRef = useRef(null);

  useEffect(() => {
    const loadMasonry = async () => {
        const Masonry = (await import('masonry-layout')).default;
        const imagesLoaded = (await import('imagesloaded')).default;

        if (gridRef.current && typeof window !== 'undefined') {
            masonryRef.current = new Masonry(gridRef.current, {
                itemSelector: '.grid-item',
                columnWidth: '.grid-sizer',
                gutter: 0,
            });

            const imgLoad = imagesLoaded(gridRef.current);
            imgLoad.on('progress', () => {
                masonryRef.current.layout();
            });
        }
    };

    loadMasonry();
}, []);


  return (
    
      <div className="w-full">
        <div ref={gridRef} className="grid " >
         {/* Masonry 布局的项目 */}
         <div className="grid-sizer"></div>
         
          {posts?.map((post, index) => (
             <BlogPost index={index} key={post.id} className="grid-item"  post={post} {...props} ref={el => blogPostRefs.current.push(el)}/>
            ))}

          
        </div>
                 
            <div className="flex justify-between text-xs">
                <Link
                    href={{ pathname: currentPage - 1 === 1 ? `${pagePrefix}/` : `${pagePrefix}/page/${currentPage - 1}`, query: router.query.s ? { s: router.query.s } : {} }}
                    className={`${showPrev ? '  ' : ' invisible block pointer-events-none '}no-underline py-2 px-3 rounded`}>

                    <button rel="prev" className="block cursor-pointer">
                    ← {locale.PAGINATION.PREV}
                     </button>

                </Link>
                <Link
                    href={{ pathname: `${pagePrefix}/page/${currentPage + 1}`, query: router.query.s ? { s: router.query.s } : {} }}
                    className={`${showNext ? '  ' : 'invisible pointer-events-none '}  no-underline py-2 px-3 rounded`}>

                    <button rel="next" className="block cursor-pointer">
                    {locale.PAGINATION.NEXT} →
                    </button>

                </Link>
            </div>
      </div> 
  )
}

export default BlogListPage
