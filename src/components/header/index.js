//组件 模板 样式 事件

//1. init.js  render.js event.js

// 渲染模板 数据 

import tpl from './index.tpl';

import './index.scss';


import {tplReplace} from '../../utils/tools'

export default () => {
    return {
        name:'header',
        tpl(opts){
            return tpl().replace(tplReplace(),(str,expr)=>{
               // console.log(str,expr);
                return {
                    title:opts.title,
                    showLeftIcon:!opts.showLeftIcon && 'none',
                    showRightIcon:!opts.showRightIcon && 'none'
                }[expr];
            });
        }
    }
}

//组件 导出 模板 html 