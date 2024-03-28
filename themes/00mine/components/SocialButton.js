import { siteConfig } from '@/lib/config'

/**
 * 社交联系方式按钮组
 * @returns {JSX.Element}
 * @constructor
 */
const SocialButton = () => {
  return <div className='w-full justify-center flex-wrap flex'>
    <div className='w-full justify-center flex-wrap flex space-x-3 text-xl text-gray-600 dark:text-gray-300 '>
      {siteConfig('CONTACT_TWITTER') && <div target='_blank' rel='noreferrer' title={'twitter'} 
      href={siteConfig('CONTACT_TWITTER')} >
        <i className='transform hover:scale-125 duration-150 fab fa-twitter dark:hover:text-indigo-400 hover:text-indigo-600'/>
      </div>}
      {siteConfig('CONTACT_EMAIL') && <div target='_blank' rel='noreferrer' title={'email'} 
      href={siteConfig('CONTACT_EMAIL')} >
        <i className='transform hover:scale-125 duration-150 fa-regular fa-envelope dark:hover:text-indigo-400 hover:text-indigo-600'/>
      </div>}
      {siteConfig('CONTACT_BEHANCE') && <div target='_blank' rel='noreferrer' title={'behance'} 
      href={siteConfig('CONTACT_BEHANCE')} >
        <i className='transform hover:scale-125 duration-150 fab fa-behance dark:hover:text-indigo-400 hover:text-indigo-600'/>
      </div>}
      {<div target='_blank' rel='noreferrer' title={'behance'}  >
        <i className='transform hover:scale-125 duration-150 fab fa-weixin dark:hover:text-indigo-400 hover:text-indigo-600'/>
      </div>}


    </div>
  </div>
}
export default SocialButton
