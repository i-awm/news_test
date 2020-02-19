export const tplReplace = () => {
    return /\{\{(.*?)\}\}/g;
}

export const showDom = (dom) => {
    dom.on('load',function(){
        $(this).css('opacity',1)
    })
}

export const scrollToBottom = (callback) => {
   //console.log(_getScrollTop(), _getWindowHeight() , _getScrollHeight())
    if(_getScrollTop() + _getWindowHeight()+1 >= _getScrollHeight()){
        callback();
    }
}

export const getUrl = (key) => {
    // host query hash 
    // protocol://host:port/path?query#hash
   let reg = new RegExp('(?:\\?|&)'+key+'=([^?#=&]+)','g');
   //console.log(reg)
    let val = '';
   window.location.href.replace(reg,(str,value)=>{
       //console.log(str,value);
    val = decodeURIComponent(value);
   })
    return val;
}

function _getScrollTop(){
    // 滚动的高度
    var scrollTop = 0,bodyScrollTop = 0,documentScrollTop = 0;
    if(document.body){
        bodyScrollTop = document.body.scrollTop;
    }
    if(document.documentElement){
        documentScrollTop = document.documentElement.scrollTop;
    }

    scrollTop = (bodyScrollTop - documentScrollTop) > 0 ? bodyScrollTop : documentScrollTop;
    return document.documentElement.scrollTop || document.body.scrollTop;
}

function _getScrollHeight(){
    //滚动条的高度
    return document.documentElement.scrollHeight || document.body.scrollHeight;
}

function _getWindowHeight(){
    // 屏幕的高度
    return document.body.clientHeight || document.documentElement.clientHeight;
}


//正则表达式 解析一个url

// protocol host port path ? search & query # hash

///():\/\/():()\/()?()#()/

///([^?=#&]+)=([^?=#&]+)/g