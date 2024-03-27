import { siteConfig } from '@/lib/config'

import Link from 'next/link'

const Logo = props => {
  const { siteInfo } = props
  return (
    <Link href='/about' passHref legacyBehavior>
      <img src={siteInfo?.icon} className='nav-item rounded-full cursor-pointer' width={40} alt={siteConfig('AUTHOR')} />
      {/* <div className='flex flex-col justify-center items-center cursor-pointer space-y-3'>
        <div className='font-medium text-lg p-1.5 rounded dark:border-white dark:text-white menu-link transform duration-200'> {siteConfig('TITLE') }</div>
      </div> */}
    </Link>
  )
}
export default Logo
