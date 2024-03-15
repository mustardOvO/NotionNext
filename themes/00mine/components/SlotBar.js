import Link from 'next/link'

/**
 * 博客列表上方嵌入条
 * @param {*} props
 * @returns
 */
export default function SlotBar(props) {
  const { tag, category } = props

  if (tag) {
    return <div className="px-3 py-2 mb-2 font-light hover:text-indigo-700 dark:hover:text-indigo-400 transform dark:text-white">
              <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`} passHref
                  className={'cursor-pointer inline-block rounded duration-200 mr-2 py-0.5 px-1 text-xl whitespace-nowrap '}>
                  <div className='font-light dark:text-gray-400 dark:hover:text-white'> {tag} </div>
              </Link>
          </div>
  } else if (category) {
    //分类标题
    return <div className="font-bold text-3xl md:text-3xl text-center px-5 py-20 mx-2 mb-8 border-b dark:border-dark-3 transform dark:text-white">
               {category}
          </div>
  }
  return <></>
}
