import { siteConfig } from '@/lib/config'
import BlogPostCard from './BlogPostCard'
import BlogPostListEmpty from './BlogPostListEmpty'
import { useGlobal } from '@/lib/global'
import { useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import { getListByPage } from '@/lib/utils'

/**
 * 博客列表滚动分页
 * @param posts 所有文章
 * @param tags 所有标签
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListScroll = ({ posts = [], currentSearch, showSummary = siteConfig('HEXO_POST_LIST_SUMMARY', null, CONFIG), siteInfo }) => {
  const postsPerPage = parseInt(siteConfig('POSTS_PER_PAGE'))
  const [page, updatePage] = useState(1)
  const postsToShow = posts

  let hasMore = false
  if (posts) {
    const totalCount = posts.length
    hasMore = page * postsPerPage < totalCount
  }

  // const handleGetMore = () => {
  //   if (!hasMore) return
  //   updatePage(page + 1)
  // }

  // 监听滚动自动分页加载
  // const scrollTrigger = () => {
  //   requestAnimationFrame(() => {
  //     const scrollS = window.scrollY + window.outerHeight
  //     const clientHeight = targetRef ? (targetRef.current ? (targetRef.current.clientHeight) : 0) : 0
  //     if (scrollS > clientHeight + 100) {
  //       handleGetMore()
  //     }
  //   })
  // }

  // 监听滚动
  // useEffect(() => {
  //   window.addEventListener('scroll', scrollTrigger)
  //   return () => {
  //     window.removeEventListener('scroll', scrollTrigger)
  //   }
  // })

  const targetRef = useRef(null)
  const { locale } = useGlobal()

  if (!postsToShow || postsToShow.length === 0) {
    return <BlogPostListEmpty currentSearch={currentSearch} />
  } else {
    return <div id='container' ref={targetRef} className='w-full max-w-5xl mx-auto'>

      {/* 文章列表 */}
      <div className="space-y-6 px-2 sm:px-8 pb-32">
        {postsToShow.map(post => (
          <BlogPostCard key={post.id} post={post} showSummary={showSummary} siteInfo={siteInfo}/>
        ))}
      </div>

      <div>
        <div 
        // onClick={() => { handleGetMore() }}
        data-aos="fade-up"
                data-aos-easing="ease-in-out"
                data-aos-duration="800"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom"
             className='w-full sm:px-6 my-4 pt-4 pb-20 text-center text-slate-400 dark:text-slate-700'
        > END </div>
      </div>
    </div>
  }
}

export default BlogPostListScroll
