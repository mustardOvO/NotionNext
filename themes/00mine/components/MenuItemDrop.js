import Link from 'next/link'

export const MenuItemDrop = ({ link }) => {

    if (!link || !link.show) {
        return null
    }

    return (
    <Link
        href={link?.to} target={link?.to?.indexOf('http') === 0 ? '_blank' : '_self'} 
        className="nav-item group size-10 rounded-full  flex justify-center  items-center  no-underline tracking-wide text-xl text-center text-gray-800/20 dark:text-gray-400 text-center align-middle 
        bg-slate-100/40 dark:bg-slate-300/10 hover:bg-white dark:hover:bg-white/20 hover:text-2xl hover:text-[#BCBF60] dark:hover:text-[#BCBF60] transition duration-200">
        
        {link?.icon && <i  className={link?.icon} />}
        <div className="group-hover:opacity-100 pointer-events-none transition-opacity bg-slate-200/60 dark:bg-black/60  border border-indigo-300/20 dark:border-indigo-300/10 p-1 text-sm text-slate-600 dark:text-slate-300/70 rounded-md absolute -bottom-8 opacity-0 ">
            {link?.name}
        </div>
    </Link>)



}
