import { getGlobalData } from '@/lib/notion/getNotionData'
// import { useRouter } from 'next/router'
// import { getLayoutByTheme } from '@/themes/theme'
// import { siteConfig } from '@/lib/config'

/**
 * 404
 * @param {*} props
 * @returns
 */
const new1 = props => {
  // 根据页面路径加载不同Layout文件
  //   const Layout = getLayoutByTheme({ theme: siteConfig('THEME'), router: useRouter() })
  //   return <Layout {...props} />
  return <div className="w-full h-20 bg-red-400">111</div>
}

export async function getStaticProps() {
  const props = (await getGlobalData({ from: 'new11' })) || {}
  return { props }
}

export default new1
