import navTpl from './nav.tpl'
import itemTpl from './nav_item.tpl';
import'./index.scss'
import {tplReplace} from '../../utils/tools'

export default () => {
    return {
        name:'nav',
        tpl(newsType){
            const len = newsType.length,
                wrapperW = (6 * len) + 'rem';
            let navStr = '',
                itemStr = '';
            
            navStr = navTpl().replace(tplReplace(),wrapperW);

            newsType.forEach((item,index) => {
                itemStr += itemTpl().replace(tplReplace(),(str,expr)=>{
                    return {
                        isCurrent: index === 0 ? 'current' : '',
                        type:item.type,
                        typeName:item.chs
                    }[expr];
                })
            });

            return {
                navStr,
                itemStr
            }

        }
    }
}