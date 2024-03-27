import Link from 'next/link'

/**
 * 博客列表上方嵌入条
 * @param {*} props
 * @returns
 */
export default function SlotBar(props) {
  const { tag, category } = props

  if (tag) {
    return <div className='px-2 py-1 ml-2 mb-2 w-min whitespace-nowrap 
      rounded-lg bg-white bg-opacity-50   
      hover:bg-black dark:hover:bg-black text-gray-700 hover:text-white duration-200 '>
      {tag}

    </div>
  }

  else if (category) {
    //分类标题
    return <div className="grid grid-col gap-6 px-5 py-12 transform justify-center ">

      <div className="font-title text-3xl  text-center tracking-wide 
    text-gray-800 dark:text-white">{category}</div>

      {/* 分割线 */}
      <div className="w-px h-20 justify-self-center  bg-dark-200 dark:bg-dark-3"></div>
    </div>
  }
  return <></>
}
