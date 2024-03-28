import { useGlobal } from '@/lib/global'
import { Moon, Sun } from './HeroIcons'
import { useImperativeHandle } from 'react'

/**
 * 深色模式按钮
 */
const DarkModeButton = (props) => {
  const { cRef } = props
  const { isDarkMode, toggleDarkMode } = useGlobal()

  /**
   * 对外暴露方法
   */
  useImperativeHandle(cRef, () => {
    return {
      handleChangeDarkMode: () => {
        toggleDarkMode()
      }
    }
  })
  // className="nav-item size-10 rounded-full dark:text-red-500 text-gray-800 flex items-center transition-all duration-200"
  return <div onClick={toggleDarkMode} className="nav-item group size-10 rounded-full  flex justify-center  items-center tracking-wide text-xl text-center text-gray-800/20 dark:text-gray-400 text-center align-middle 
  bg-slate-100/40 dark:bg-slate-300/10 hover:bg-white dark:hover:bg-white/20 hover:text-2xl hover:text-[#BCBF60] dark:hover:text-[#BCBF60] transition duration-200">
        <div id='darkModeButton' className='size-6 group-hover:size-7 cursor-pointer'> {isDarkMode ? <Moon /> : <Sun />}</div>
    </div>
}
export default DarkModeButton
