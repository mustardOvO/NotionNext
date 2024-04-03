import Link from 'next/link'

/**
 * 首页导航大按钮组件
 * @param {*} props
 * @returns
 */
const NavButtonGroup = (props) => {
  const { categoryOptions } = props
  if (!categoryOptions || categoryOptions.length === 0) {
    return <></>
  }

  return (
    <nav id='home-nav-button' className="w-fit mt-20 flex flex-col gap-4 sm:gap-12">
      {categoryOptions?.map(category => {
        return (
          <Link
            key={`${category.name}`}
            title={`${category.name}`}
            href={`/category/${category.name}`}
            className='group font-title hover:tracking-widest text-center text-2xl sm:text-3xl text-nowrap text-[#ebe19fcc] hover:text-[#dbe6c9]
            w-full  justify-center items-center flex flex-nowrap content-center gap-4 
            cursor-pointer  duration-200 transition-all'>
               <div className="text-xl iconfont icon-tri-right  text-[#ebe19fcc] text-center group-hover:opacity-100 opacity-0 transition duration-200"></div>
               {category.name}
               <div className=" text-xl iconfont icon-tri-left  text-[#ebe19fcc] text-center group-hover:opacity-100 opacity-0 transition duration-200"></div>
            </Link>
        )
      })}
    </nav>
  )
}
export default NavButtonGroup
