/* eslint-disable react/no-unknown-property */
/**
 * 这里的css样式只对当前主题生效
 * 主题客制化css
 * @returns
 */
const Style = () => {
  return (<style jsx global>{`
    // 底色
    body{
        background-color: #f5f5f5
    }
    .dark body{
        background-color: black;
    }
  
    /*  菜单下划线动画 */
    #theme-hexo .menu-link {
        text-decoration: none;
        background-image: linear-gradient(#928CEE, #928CEE);
        background-repeat: no-repeat;
        background-position: bottom center;
        background-size: 0 2px;
        transition: background-size 100ms ease-in-out;
    }
    
    #theme-hexo .menu-link:hover {
        background-size: 100% 2px;
        color: #928CEE;
    }

    /* 设置了从上到下的渐变黑色 */
    #theme-hexo .header-cover::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background:  linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 10%, rgba(0,0,0,0) 25%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0.5) 100%);
    }

    /* Custem */
    .tk-footer{
        opacity: 0;
    }

    // 选中字体颜色
    ::selection {
        background: rgba(45, 170, 219, 0.3);
    }

    // 自定义滚动条
    ::-webkit-scrollbar {
        width: 10px;
        
    }

    ::-webkit-scrollbar-track {
        background: transparent;
        color: #337799;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background: #334455; 
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #445566; 
      }

    // * {
    //     // scrollbar-width:thin;
    //     scrollbar-color: #334455 transparent
        
    // }
    
    //masonry
    .grid{}
    .grid-item {}
    .grid-sizer {}
    //sm: '540px',
    @media (min-width: 576px) {
        .grid-item,.grid-sizer {width: 100%;}
    }

    //md: '720px',
    @media (min-width: 992px) {
        .grid-item,.grid-sizer {width: 33.3%;}
    }

    //lg: '960px',
    // @media (min-width: 992px) {
    //     .grid-item,.grid-sizer {width: 20%;}
    // }

    //xl: '1140px',
    // @media (min-width: 1200px) {
    //     .grid-item,.grid-sizer {width: 20%;}
    // }

    //'2xl': '1320px'
    @media (min-width: 1400px) {
        .grid-item,.grid-sizer {width: 20%;}
    }

  `}</style>)
}

export { Style }
