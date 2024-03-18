import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useHexoGlobal } from '..'
import { ArrowPath, ChevronLeft, ChevronRight } from '@/components/HeroIcons'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import LazyImage from '@/components/LazyImage'
import { compressImage } from '@/lib/notion/mapImage'
import NotionPage from '@/components/NotionPage'
import PostHeader from './PostHeader'




/**
 * 弹出框
 */
export default function Modal(props) {
    const { showModal, setShowModal, modalContent, setModalContent } = useHexoGlobal()
    const { siteInfo, posts } = props
    const cancelButtonRef = useRef(null)
    const img = compressImage(modalContent?.pageCover || siteInfo?.pageCover, 1200, 85, 'webp')
    const imgRef = useRef(null)

    // 添加loading状态
    const [loading, setLoading] = useState(true)

    // 在图片加载完成时设置loading为false
    function handleImageLoad() {
        setLoading(false)
    }

    // 关闭弹窗
    function handleClose() {
        setShowModal(false)
        setLoading(true)
    }



    return (
        <Transition.Root show={showModal} as={Fragment}>
            <Dialog as="div" className="relative z-20"  onClose={handleClose}>
                {/* 遮罩 */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }} className="fixed inset-0 glassmorphism transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-30 overflow-y-auto items-center">
                    <div className="flex min-h-full justify-center p-4 text-center items-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 scale-50 w-0"
                            enterTo={'opacity-100 translate-y-0 max-w-screen'}
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 scale-100  max-w-screen"
                            leaveTo="opacity-0 translate-y-4 scale-50 w-0"
                        >
                            <Dialog.Panel className="relative w-full max-w-4xl transform overflow-hidden rounded-xl text-left shadow-xl transition-all ">
                            <PostHeader post={modalContent} {...props} />


                                <section className='px-8 pt-4 pb-10 bg-white dark:bg-hexo-black-gray'>
                                    {/* <div className="font-medium text-3xl text-black dark:text-white">
                                        {modalContent?.title}
                                    </div>
                                    <div className="pt-2 font-regular  text-gray-400 dark:text-gray-500">
                                        {modalContent?.publishDay}
                                    </div> */}

                                    
                                    

                                    <NotionPage post={modalContent} />
                                </section>


                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
