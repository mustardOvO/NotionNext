import Link from 'next/link'
import { useState } from 'react'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0

  if (!link || !link.show) {
    return null
  }

  return <div className="size-10  justify-center flex justify-content bg-white/30 dark:bg-white/10  rounded-full hover:scale-125 duration-200"  onMouseOver={() => changeShow(true)} onMouseOut={() => changeShow(false)} >
    <Link
                href={link?.to} target={link?.to?.indexOf('http') === 0 ? '_blank' : '_self'} 
                className="w-full  rounded-full leading-10 no-underline tracking-wide text-xl text-gray-400/50 dark:text-gray-400 text-center align-middle 
                hover:bg-white dark:hover:bg-white/20 hover:text-[#BCBF60] dark:hover:text-[#BCBF60] duration-200">
                {link?.icon && <i className={link?.icon}/>} 
                {!link?.icon && link?.name}
            </Link>


    </div>
}
