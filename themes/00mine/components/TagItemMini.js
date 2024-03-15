import Link from 'next/link'

const TagItemMini = ({ tag, selected = false }) => {
  return (
    <Link
      key={tag}
      href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`}
      passHref
       
      className={`cursor-pointer inline-block mr-2 py-1 px-2 text-xs whitespace-nowrap 
      rounded-lg bg-white bg-opacity-50 backdrop-blur-sm  
      hover:bg-black dark:hover:bg-black text-gray-700 hover:text-white duration-200` }
        >

      <div className='font-light'>{selected && <i className='mr-1 fa-tag'/>} {tag.name + (tag.count ? `(${tag.count})` : '')} </div>

    </Link>
  );
}

export default TagItemMini
