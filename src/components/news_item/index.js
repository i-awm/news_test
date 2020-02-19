import tpl_0 from './tpl/tpl0.tpl';
import tpl_1 from './tpl/tpl1.tpl';
import tpl_2 from './tpl/tpl2.tpl';
import tpl_3 from './tpl/tpl3.tpl';
import './index.scss';
import {tplReplace} from '../../utils/tools';


export default () => {
    let flag = false;
    return {
        name:'new_list',
        tpl(data,pageNum){
            let list = '',
                template = '';

            data.forEach((item,index) => {
                if(!item.thumbnail_pic_s){
                    template = tpl_0()
                }else if(item.thumbnail_pic_s&&!item.thumbnail_pic_s02){
                    template = tpl_1()
                }else if(item.thumbnail_pic_s02&&!item.thumbnail_pic_s03){
                    template = tpl_2()
                }else if(item.thumbnail_pic_s03){
                    template = tpl_3();
                }
                
                
                list += template.replace(tplReplace(),(str,expr)=>{
                    console.log(expr)
                    return {
                        pageNum,
                        index,
                        uniquekey:item.uniquekey,
                        url:item.url,
                        title:item.title,
                       author:item.author_name,
                        date:item.date,
                        thumbnail_pic_s:item.thumbnail_pic_s,
                        thumbnail_pic_s02:item.thumbnail_pic_s02,
                        thumbnail_pic_s03:item.thumbnail_pic_s03,
                    }[expr]
                })

         

            });
            return list;
        }
    }
}

// 模板 每一项 
//      当前的一项