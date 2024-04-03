import CONFIG from './config'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Footer from './components/Footer'
import SocialButton from './components/SocialButton'
import TopNav from './components/TopNav'
import TopNavB from './components/TopNavB'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import BlogPostListPage from './components/BlogPostListPage'
import BlogPostListScroll from './components/BlogPostListScroll'
import BlogListPage from './components/BlogListPage'
import BlogListScroll from './components/BlogListMasonryScroll'
import Hero from './components/Hero'
import { useRouter } from 'next/router'
import Card from './components/Card'
import RightFloatArea from './components/RightFloatArea'
import SearchNav from './components/SearchNav'
import BlogPostArchive from './components/BlogPostArchive'
import { ArticleLock } from './components/ArticleLock'
import PostHeader from './components/PostHeader'
import JumpToCommentButton from './components/JumpToCommentButton'
import TocDrawer from './components/TocDrawer'
import TocDrawerButton from './components/TocDrawerButton'
import Comment from '@/components/Comment'
import NotionPage from '@/components/NotionPage'
import ArticleAdjacent from './components/ArticleAdjacent'
import ArticleCopyright from './components/ArticleCopyright'
import ArticleRecommend from './components/ArticleRecommend'
import ShareBar from '@/components/ShareBar'
import TagItemMini from './components/TagItemMini'
import Link from 'next/link'
import SlotBar from './components/SlotBar'
import { Transition } from '@headlessui/react'
import { Style } from './style'
import replaceSearchResult from '@/components/Mark'
import { siteConfig } from '@/lib/config'
// import AlgoliaSearchModal from '@/components/AlgoliaSearchModal'
import dynamic from 'next/dynamic'
import Modal from './components/Modal'

const AlgoliaSearchModal = dynamic(() => import('@/components/AlgoliaSearchModal'), { ssr: false })

// 主题全局状态
const ThemeGlobalHexo = createContext()
export const useHexoGlobal = () => useContext(ThemeGlobalHexo)

/**
 * 基础布局 采用左右两侧布局，移动端使用顶部导航栏
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { post, children, slotTop, className } = props
  const { onLoading, fullWidth } = useGlobal()
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  const router = useRouter()
  const closeModal = () => {
    setShowModal(false)
  }
  useEffect(() => {
    router.events.on('routeChangeComplete', closeModal)
    return () => {
      router.events.off('routeChangeComplete', closeModal)
    }
  }, [router.events])

  const headerSlot = post
    ? <PostHeader {...props} />
    : (router.route === '/' && siteConfig('HEXO_HOME_BANNER_ENABLE', null, CONFIG)
      ? <Hero {...props} />
      : null)

  const drawerRight = useRef(null)
  const tocRef = isBrowser ? document.getElementById('article-wrapper') : null

  const floatSlot = <>
    {post?.toc?.length > 1 && <div className="block lg:hidden">
      <TocDrawerButton
        onClick={() => {
          drawerRight?.current?.handleSwitchVisible()
        }}
      />
    </div>}
    <JumpToCommentButton />
  </>

  // Algolia搜索框
  const searchModal = useRef(null)

  if (router.route === '/') //首页
    return (<ThemeGlobalHexo.Provider value={{ searchModal }}>
      <div id='theme-hexo' className={`${siteConfig('FONT_STYLE')} bg-hexo-background-black scroll-smooth`}>
        <Style />

        {/* 底部导航 */}
        <TopNavB {...props} />

        {/* 顶部嵌入 */}
        <Transition
          show={!onLoading}
          appear={true}
          enter="transition ease-in-out duration-700 transform order-first"
          enterFrom="opacity-0 -translate-y-16"
          enterTo="opacity-100"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="opacity-100"
          leaveTo="opacity-0 translate-y-16"
          unmount={false}
        >
          {headerSlot}
        </Transition>
      </div>
    </ThemeGlobalHexo.Provider>
    )
  else return (
    <ThemeGlobalHexo.Provider value={{ searchModal, showModal, setShowModal, modalContent, setModalContent }}>
      <div id='theme-hexo' className={`${siteConfig('FONT_STYLE')} dark:bg-hexo-background-black scroll-smooth`}>
        <Style />

        {/* 底部导航 */}
        <TopNavB {...props} />

        {/* 顶部嵌入 */}
        <Transition
          show={!onLoading}
          appear={true}
          enter="transition ease-in-out duration-700 transform order-first"
          enterFrom="opacity-0 -translate-y-16"
          enterTo="opacity-100"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="opacity-100"
          leaveTo="opacity-0 translate-y-16"
          unmount={false}
        >
          {headerSlot}
        </Transition>


        {/* 主区块 */}

        <main id="wrapper" className={` bg-hexo-background-grey dark:bg-hexo-background-black w-full  min-h-screen  relative`}>
          <div id="container-inner" className={' w-full mx-0 flex  justify-center relative z-10'} >
            <div className={`${className || ''} w-full ${fullWidth ? '' : ''} h-full overflow-hidden`}>

              <Transition
                show={!onLoading}
                appear={true}
                enter="transition ease-in-out duration-700 transform order-first"
                enterFrom="opacity-0 translate-y-16"
                enterTo="opacity-100"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-16"
                unmount={false}
              >
                {/* 主区上部嵌入 */}
                {slotTop}

                {children}
              </Transition>
            </div>
          </div>
        </main>



        <div className='block lg:hidden'>
          <TocDrawer post={post} cRef={drawerRight} targetRef={tocRef} />
        </div>

        {/* 悬浮菜单 */}
        {/* <RightFloatArea floatSlot={floatSlot} /> */}

        {/* 全文搜索 */}
        <AlgoliaSearchModal cRef={searchModal} {...props} />

        {/* 弹出框 - 用于放大显示首页图片等作用 */}
        <Modal {...props} />

        {/* 页脚 */}
        {/* {<Footer title={siteConfig('TITLE') } />} */}
      </div>
    </ThemeGlobalHexo.Provider>
  )
}

/**
 * 首页
 * 是一个博客列表，嵌入一个Hero大图<Hero {...props} />
 * @param {*} props
 * @returns
 */
const LayoutIndex = (props) => {
  return <></>
}

/**
 * 博客列表
 * @param {*} props
 * @returns
 */
const LayoutPostList = (props) => {
  return <div className='pt-8'>
    <SlotBar {...props} />
    {siteConfig('POST_LIST_STYLE') === 'page' ? <BlogPostListPage {...props} /> : <BlogPostListScroll {...props} />}
  </div>
}

/**
 * 博客列表2，图片形式
 * @param {*} props
 * @returns
 */
const LayoutPlogList = (props) => {
  const router = useRouter()
  if (props.posts && props.posts[0] && props.posts[0].category === '3D实验'){ //3D实验——使用瀑布流
    return <div className='pt-8'> 
    <SlotBar {...props} />
    {siteConfig('POST_LIST_STYLE') === 'page' ? <BlogListPage {...props} /> : <BlogListScroll {...props} />}
  </div>}

  else{return <div className='pt-8'>
  <SlotBar {...props} />
  {siteConfig('POST_LIST_STYLE') === 'page' ? <BlogPostListPage {...props} /> : <BlogPostListScroll {...props}/>}
</div>}
}

/**
 * 搜索
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  useEffect(() => {
    if (currentSearch) {
      replaceSearchResult({
        doms: document.getElementsByClassName('replace'),
        search: keyword,
        target: {
          element: 'span',
          className: 'text-red-500 border-b border-dashed'
        }
      })
    }
  })

  return (
    <div className='pt-8'>
      {!currentSearch
        ? <SearchNav {...props} />
        : <div id="posts-wrapper"> {siteConfig('POST_LIST_STYLE') === 'page' ? <BlogPostListPage {...props} /> : <BlogPostListScroll {...props} />}  </div>}
    </div>
  )
}

/**
 * 归档
 * @param {*} props
 * @returns
 */
const LayoutArchive = (props) => {
  const { archivePosts } = props
  return <div className='pt-8'>
    <Card className='w-full'>
      <div className="mb-10 pb-20 bg-white md:p-12 p-3 min-h-full dark:bg-hexo-black-gray">
        {Object.keys(archivePosts).map(archiveTitle => (
          <BlogPostArchive
            key={archiveTitle}
            posts={archivePosts[archiveTitle]}
            archiveTitle={archiveTitle}
          />
        ))}
      </div>
    </Card>
  </div>
}

/**
 * 文章详情
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const router = useRouter()
  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(() => {
        if (isBrowser) {
          const article = document.getElementById('notion-article')
          if (!article) {
            router.push('/404').then(() => {
              console.warn('找不到页面', router.asPath)
            })
          }
        }
      }, siteConfig('POST_WAITING_TIME_FOR_404') * 1000)
    }
  }, [post])
  return (
    <>
      <div className="w-full  article">
        {lock && <ArticleLock validPassword={validPassword} />}

        {!lock && <div id="article-wrapper" className="w-full  ">

          <article itemScope itemType="https://schema.org/Movie" className="subpixel-antialiased overflow-y-hidden" >
            {/* Notion文章主体 */}
            <section className='px-2 md:p-6 mx-auto justify-center lg:max-w-5xl'>
              {post && <NotionPage post={post} />}
            </section>

            {/* 分享 */}
            {/* <ShareBar post={post} /> */}
            {post?.type === 'Post' && <>
              {/* <ArticleCopyright {...props} />
              <ArticleRecommend {...props} /> */}
              <ArticleAdjacent {...props} />
            </>}

          </article>

          {/* <div className='pt-4 border-dashed'></div> */}

        </div>}
      </div>

    </>
  )
}

/**
 * 404
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  const router = useRouter()
  useEffect(() => {
    // 延时3秒如果加载失败就返回首页
    setTimeout(() => {
      if (isBrowser) {
        const article = document.getElementById('notion-article')
        if (!article) {
          router.push('/').then(() => {
            // console.log('找不到页面', router.asPath)
          })
        }
      }
    }, 3000)
  })
  return (
    <>
      <div className="text-black w-full h-screen text-center justify-center content-center items-center flex flex-col">
        <div className="dark:text-gray-200">
          <h2 className="inline-block border-r-2 border-gray-600 mr-2 px-3 py-2 align-top">
            404
          </h2>
          <div className="inline-block text-left h-32 leading-10 items-center">
            <h2 className="m-0 p-0">页面未找到</h2>
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * 分类列表
 * @param {*} props
 * @returns
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  const { locale } = useGlobal()
  return (
    <div className='mt-8'>
      <Card className="w-full min-h-screen">
        <div className="dark:text-gray-200 mb-5 mx-3">
          <i className="mr-4 fas fa-th" />  {locale.COMMON.CATEGORY}:
        </div>
        <div id="category-list" className="duration-200 flex flex-wrap mx-8">
          {categoryOptions?.map(category => {
            return (
              <Link key={category.name} href={`/category/${category.name}`} passHref legacyBehavior>
                <div className={' duration-300 dark:hover:text-white px-5 cursor-pointer py-2 hover:text-indigo-400'}>
                  <i className="mr-4 fas fa-folder" />  {category.name}({category.count})
                </div>
              </Link>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

/**
 * 标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  const { locale } = useGlobal()
  return (
    <div className='mt-8'>
      <Card className='w-full'>
        <div className="dark:text-gray-200 mb-5 ml-4">
          <i className="mr-4 fas fa-tag" /> {locale.COMMON.TAGS}:
        </div>
        <div id="tags-list" className="duration-200 flex flex-wrap ml-8">
          {tagOptions.map(tag => <div key={tag.name} className="p-2">
            <TagItemMini key={tag.name} tag={tag} />
          </div>)}
        </div>
      </Card>
    </div>
  )
}


/**
 * 新款页面
 * @param {*} props
 * @returns
 */
const LayoutAbout = (props) => {
  const { post, siteInfo } = props
  const router = useRouter()

  // useEffect(() => {// 404
  //   if (!post) {
  //     setTimeout(() => {
  //       if (isBrowser) {
  //         const article = document.getElementById('notion-article')
  //         if (!article) {
  //           router.push('/404').then(() => {
  //             console.warn('找不到页面', router.asPath)
  //           })
  //         }
  //       }
  //     }, siteConfig('POST_WAITING_TIME_FOR_404') * 1000)
  //   }
  // }, [post])
  return (
    <>
      <div className="w-full  about">

        <div id="article-wrapper" className="w-full  ">

          <article  className="subpixel-antialiased overflow-y-hidden" >
            {/* Notion文章主体 */}
            <section className='px-2 md:p-6 mx-auto w-full items-center space-y-4 object-top lg:max-w-5xl'>
              <img src={siteInfo?.icon} className='size-32 mx-auto object-center rounded-xl cursor-pointer' alt={siteConfig('AUTHOR')} />
              <SocialButton className=' ' />
              {post && <NotionPage post={post} />}

            </section>



          </article>



        </div>
      </div>

    </>
  )
}

export {
  CONFIG as THEME_CONFIG,
  LayoutBase,
  LayoutIndex,
  LayoutSearch,
  LayoutArchive,
  LayoutSlug,
  Layout404,
  LayoutCategoryIndex,
  LayoutPostList,
  LayoutTagIndex,
  LayoutAbout,
  LayoutPlogList,
}
