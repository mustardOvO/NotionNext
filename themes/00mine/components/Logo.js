import { siteConfig } from '@/lib/config'

import Link from 'next/link'

const Logo = props => {
  const { siteInfo } = props
  return (
    <Link href='/about' className="group flex justify-center  items-center">
      <img src={siteInfo?.icon} className='nav-item object-center rounded-full cursor-pointer' width={40} alt={siteConfig('AUTHOR')} />
      {/* <div className='flex flex-col justify-center items-center cursor-pointer space-y-3'>
        <div className='font-medium text-lg p-1.5 rounded dark:border-white dark:text-white menu-link transform duration-200'> {siteConfig('TITLE') }</div>
      </div> */}
      <div className="group-hover:opacity-100 pointer-events-none transition-opacity bg-slate-200/60 dark:bg-black/60  border border-indigo-300/20 dark:border-indigo-300/10 p-1 text-sm text-slate-600 dark:text-slate-400/70 rounded-md absolute -bottom-8 opacity-0 ">
            me
        </div>
    </Link>
  )
}
export default Logo
