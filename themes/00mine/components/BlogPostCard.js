import Link from 'next/link'
import TagItemMini from './TagItemMini'
import CONFIG from '../config'
import { BlogPostCardInfo } from './BlogPostCardInfo'
import { siteConfig } from '@/lib/config'
import LazyImage from '@/components/LazyImage'
import { checkContainHttp, sliceUrlFromHttp } from '@/lib/utils'

const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
    const showPreview = siteConfig('HEXO_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
    if (post && !post.pageCoverThumbnail && siteConfig('HEXO_POST_LIST_COVER_DEFAULT', null, CONFIG)) {
        post.pageCoverThumbnail = siteInfo?.pageCover
    }
    const showPageCover = siteConfig('HEXO_POST_LIST_COVER', null, CONFIG) && post?.pageCoverThumbnail
    //   const delay = (index % 2) * 200
    const url = checkContainHttp(post.slug) ? sliceUrlFromHttp(post.slug) : `${siteConfig('SUB_PATH', '')}/${post.slug}`

    return (

        <div  >
            <div key={post.id}
                data-aos="fade-up"
                data-aos-easing="ease-in-out"
                data-aos-duration="800"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom"
                id='blog-post-card'
                className={`group w-full pb-6 border-b border-slate-300 dark:border-slate-700
                flex justify-between sm:flex-row flex-col-reverse overflow-hidden `}>



                {/* 文字内容 */}
                <BlogPostCardInfo index={index} post={post} showPageCover={showPageCover} showPreview={showPreview} showSummary={showSummary} />

                {/* 图片封面 */}
                {showPageCover && (
                    <div className='w-full sm:w-64 h-32' >
                        <LazyImage priority={index === 1} src={post?.pageCoverThumbnail} className='w-full h-full object-cover object-center ' />
                        {/* 文章tag */}
                        <div className="flex fixed right-0 top-0 m-2">
                            {post.tagItems && (
                                <div className="flex  flex-wrap overflow-x-auto  ">
                                    {post.tagItems.map(tag => (
                                        <TagItemMini key={tag.name} tag={tag} />
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>
                )}

            </div>

        </div>

    )
}

export default BlogPostCard
