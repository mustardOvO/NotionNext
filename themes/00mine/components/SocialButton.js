import { siteConfig } from '@/lib/config'

/**
 * 社交联系方式按钮组
 * @returns {JSX.Element}
 * @constructor
 */
const SocialButton = () => {
  return <div className='w-full flex-wrap justify-center flex text-xl text-gray-600 dark:text-gray-300 '>
    {siteConfig('CONTACT_TWITTER') && <a target='_blank' rel='noreferrer' title={'twitter'} 
    className='group object-center' href={siteConfig('CONTACT_TWITTER')} >
        <i className='p-2 fab fa-twitter transform group-hover:scale-125 duration-150'/>
        <div className="opacity-0  group-hover:opacity-100 inline-block group-hover:w-24 w-0 
        text-sm text-clip align-middle overflow-hidden transition-all duration-300">mustardOvO</div>
      </a>}

      {siteConfig('CONTACT_BEHANCE') && <a target='_blank' rel='noreferrer' title={'behance'} 
      className='group object-center' href={siteConfig('CONTACT_BEHANCE')} >
        <i className='p-2 transform group-hover:scale-125 duration-150 fab fa-behance '/>
        <div className="opacity-0  group-hover:opacity-100 inline-block group-hover:w-24 w-0 
        text-sm text-clip align-middle overflow-hidden transition-all duration-300">mustardOvO</div>
</a>}

      {siteConfig('CONTACT_EMAIL') && <a target='_blank' rel='noreferrer' title={'email'} 
      className='group' href={`mailto:${siteConfig('CONTACT_EMAIL')}`} >
        <i className='p-2 transform group-hover:scale-125 duration-150 fas fa-envelope '/>
        <div className="opacity-0 align-middle group-hover:opacity-100 inline-block group-hover:w-40 w-0 
        text-sm text-clip overflow-hidden transition-all duration-300">mustardovo@gmail.com</div>
</a>}

      {<a target='_blank' className='group' rel='noreferrer' title={'weixin'}  >
        <i className='p-2 transform group-hover:scale-125 duration-150 fab fa-weixin '/>
        <div className="opacity-0 align-middle  group-hover:opacity-100 inline-block group-hover:w-24 w-0 
        text-sm text-clip overflow-hidden transition-all duration-300">mustardOvO</div>
      </a>}


    </div>
  
}
export default SocialButton
