
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import Link from 'next/link'
import BlogPost from './BlogPost'
import { useEffect, useRef } from 'react'
import { siteConfig } from '@/lib/config'

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

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.toggle('visible')
        }
      })
    }, {
      threshold: 0.1 // 调整阈值以达到最佳效果
    })

    blogPostRefs.current.forEach(ref => {
      observer.observe(ref)
    })

    return () => {
      observer.disconnect()
    }
  }, [])
  
  const reorder = (arr, columns) => {
    // re-order the array so the "cards" read left-right
    // cols === CSS column-count value
    
    const cols = columns;
    const out = [];
    let col = 0;
    while(col < cols) {
        for(let i = 0; i < arr.length; i += cols) {
            let _val = arr[i + col];
            if (_val !== undefined)
                out.push(_val);
        }
        col++;
    }
    return(out);
    
}  

let postlist=reorder(posts, 3);

  return (
      <div className="w-full">

            <div id="posts-wrapper" className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-0'>
            {/* <div id="posts-wrapper" className='grid grid-cols-3 grid-flow-col-dense	'> */}
                {posts?.map((post, index) => (
                   <BlogPost index={index} key={post.id} className='order-{10-index}' post={post} {...props} ref={el => blogPostRefs.current.push(el)}/>
                ))}
            </div>

            {/* 分页 */}
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
