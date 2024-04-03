import { useGlobal } from '@/lib/global'

/**
 * 空白博客 列表
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListEmpty = ({ currentSearch }) => {
  const { locale } = useGlobal()
  return <div className='w-full my-4 pt-4 pb-20 text-center text-slate-400 dark:text-slate-700'>
        EMPTY
  </div>
}
export default BlogPostListEmpty
