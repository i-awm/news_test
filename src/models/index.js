//数据模型
import HTTP from '../utils/http.js';
import { reject } from 'q';

class IndexModel extends HTTP {
    getNewsList(field,showCount=10) {
        const cache = this.getNewsList.cache || (this.getNewsList.cache = new Map());

        if(cache.has(field)){
            console.log('走缓存了');
            return Promise.resolve(cache.get(field));
        }

       return new Promise((resolve,reject)=>{
        this.ajax({
            url: '/getNewsList',
            method:'POST',
            data: {
                field
            },
            success:(data)=> {
                
                let listData = data.result.data,
                    len = listData.length;
                
                let pageData = [],
                    index = 0;
                
                while(index < len){
                    pageData.push(listData.slice(index,index+=showCount));
                }
                //缓存结果 
                cache.set(field,pageData);
                
                //console.log(this.getNewsList.cache);
                resolve(pageData);
            }
        })
       })
        
    }
}

export default IndexModel;


//异步请求结果缓存 数据组织  异步执行 


// author_name:"肿瘤的真相与误区"
// category:"头条"
// date:"2020-02-16 08:01"
// thumbnail_pic_s:"http://08imgmini.eastday.com/mobile/20200216/2020021608_eeef38b197734b54976f25599d2da443_0315_mwpm_03200403.jpg"
// title: "长期喝桶装水会怎样？有人因此引发肝癌，健康喝水要注意5点"
// uniquekey:"801bc6dc9edf10ea2a58c972729b9fc2"
// url:"http://mini.eastday.com/mobile/200216080139689.html"