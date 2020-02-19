const _doAjax = Symbol('_doAjax');


// 用symbol 作为私有属性 和方法 名
class HTTP {

    constructor(base_url='http://api.jsplusplus.com/Juhe') {
        this.base_url = base_url;
       //创建ajax对象
       this[_doAjax];
    }


    ajax(opts = {}){
        this[_doAjax](opts)
    }

    [_doAjax](opt){
        let o = window.XMLHttpRequest ?
                new XMLHttpRequest :
                new ActiveXObject('Microsoft.XMLHTTP');
        
        if(!o){
            throw new Error('不支持异步HTTP请求')
        }

        let type = (opt.method || "GET").toUpperCase(),
            async = opt.async || true,
            data = opt.data || null,
            dataType = (opt.dataType || 'JSON').toUpperCase(),
            timeout = opt.timeout || 30000,
            error = opt.error,
            success = opt.success,
            url = opt.url,
            headers = opt.headers || {};
        if(!url){
            throw new Error('请输入url');
        }

        url = this.base_url + url;

        // .replace(/((?:\/) \1+)/g,'/');
        o.open(type,url,async)
        o.timeout = timeout;

        Object.keys(headers).forEach(key => {
            o.setRequestHeader(key, headers[key]);
        })

       

        type === 'POST'&& o.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

        o.send(type === 'GET'? null : formatData(data));
        o.onreadystatechange = function (){
            if(o.readyState === 4){
                if(/^(2|3)\d{2}$/.test(o.status)){
                    //状态码以2/3开头
                    success&&success(dataType === 'JSON'? JSON.parse(o.responseText):o.responseText);
                }else{
                    error&&error(o);
                }
                o = null;
            }
        } 
    }
}

function formatData(data){
    let arr = [];
    Object.keys(data).forEach(key =>{
        arr.push(key+'='+data[key]);
    })
    return arr.join('&');
}

//JSONP
//缓存结果
export default HTTP;



/**
 * 了解JS异步编程，模块化编程思想。
 * 浏览器渲染过程。
 */