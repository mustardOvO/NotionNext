import Link from 'next/link'
import { useState } from 'react'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0

  if (!link || !link.show) {
    return null
  }

  return <Link
                href={link?.to} target={link?.to?.indexOf('http') === 0 ? '_blank' : '_self'} 
                className="nav-item size-10 rounded-full  flex justify-center  items-center  no-underline tracking-wide text-xl text-center text-gray-400/50 dark:text-gray-400 text-center align-middle 
                bg-white/30 dark:bg-gray-300/10 hover:bg-white dark:hover:bg-white/20 hover:text-2xl hover:text-[#BCBF60] dark:hover:text-[#BCBF60] transition duration-200">
                {link?.icon && <i className={link?.icon}/>} 
                {!link?.icon && link?.name}
            </Link>



}
