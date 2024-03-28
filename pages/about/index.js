import BLOG from '@/blog.config'
import { getPostBlocks } from '@/lib/notion'
import { getGlobalData } from '@/lib/notion/getNotionData'
import { useEffect, useState } from 'react'
import { idToUuid } from 'notion-utils'
import { useRouter } from 'next/router'
import { getNotion } from '@/lib/notion/getNotion'
import { getPageTableOfContents } from '@/lib/notion/getPageTableOfContents'
import { getLayoutByTheme } from '@/themes/theme'
import md5 from 'js-md5'
import { uploadDataToAlgolia } from '@/lib/algolia'
import { siteConfig } from '@/lib/config'

/**
 * 根据notion的slug访问页面
 * 只解析一级目录例如 /about
 * @param {*} props
 * @returns
 */
const About = props => {
  const { post } = props

  // 文章锁🔐
  const [lock, setLock] = useState(post?.password && post?.password !== '')

  /**
   * 验证文章密码
   * @param {*} result
  */
  const validPassword = passInput => {
    const encrypt = md5(post.slug + passInput)
    if (passInput && encrypt === post.password) {
      setLock(false)
      return true
    }
    return false
  }

  // 文章加载
  useEffect(() => {
    // 文章加密
    if (post?.password && post?.password !== '') {
      setLock(true)
    } else {
      setLock(false)
      if (!lock && post?.blockMap?.block) {
        post.content = Object.keys(post.blockMap.block).filter(key => post.blockMap.block[key]?.value?.parent_id === post.id)
        post.toc = getPageTableOfContents(post, post.blockMap)
      }
    }
  }, [post])

  props = { ...props, lock, setLock, validPassword }
  // 根据页面路径加载不同Layout文件
  const Layout = getLayoutByTheme({ theme: siteConfig('THEME'), router: useRouter() })
  return <Layout {...props} />
}

// export async function getStaticPaths() {
//   if (!BLOG.isProd) {
//     return {
//       paths: [],
//       fallback: true
//     }
//   }

//   const from = 'slug-paths'
//   const { allPages } = await getGlobalData({ from })
//   const paths = allPages?.filter(row => checkSlug(row))
//     .map(row => ({ params: { prefix: row.slug } }))
//   return {
//     paths: paths,
//     fallback: true
//   }
// }

export async function getStaticProps() {
  let fullSlug = 'aboutme'
  if (JSON.parse(BLOG.PSEUDO_STATIC)) {
    if (!fullSlug.endsWith('.html')) {
      fullSlug += '.html'
    }
  }
  const from = `slug-props-${fullSlug}`
  const props = await getGlobalData({ from })
  // 在列表内查找文章
  props.post = props?.allPages?.find((p) => {
    return (p.type.indexOf('Menu') < 0) && (p.slug === fullSlug || p.id === idToUuid(fullSlug))
  })

  // 处理非列表内文章的内信息
  if (!props?.post) {
    const pageId = 'aboutme'
    if (pageId.length >= 32) {
      const post = await getNotion(pageId)
      props.post = post
    }
  }
  // 无法获取文章
  if (!props?.post) {
    props.post = null
    return { props, revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND) }
  }

  // 文章内容加载
  if (!props?.posts?.blockMap) {
    props.post.blockMap = await getPostBlocks(props.post.id, from)
  }

  // 生成全文索引 && process.env.npm_lifecycle_event === 'build' && JSON.parse(BLOG.ALGOLIA_RECREATE_DATA)
  if (BLOG.ALGOLIA_APP_ID) {
    uploadDataToAlgolia(props?.post)
  }

  // 推荐关联文章处理
  const allPosts = props.allPages?.filter(page => page.type === 'Post' && page.status === 'Published')
  if (allPosts && allPosts.length > 0) {
    const index = allPosts.indexOf(props.post)
    props.prev = allPosts.slice(index - 1, index)[0] ?? allPosts.slice(-1)[0]
    props.next = allPosts.slice(index + 1, index + 2)[0] ?? allPosts[0]
    // props.recommendPosts = getRecommendPost(props.post, allPosts, BLOG.POST_RECOMMEND_COUNT)
  } else {
    props.prev = null
    props.next = null
    props.recommendPosts = []
  }

  delete props.allPages
  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

export default About
