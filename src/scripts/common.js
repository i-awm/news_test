//rem 根元素font-size大小 1rem = 10px 更标签fontsize
//设计稿 iphone6  平板 掉闹
// document.documentElement.style.fontSize = document.documentElement.clientWidth / 37.5 + 'px';

~function(){
    function doRem(){
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 37.5 + 'px';
    }
    doRem();
    window.onresize = function(){
        doRem();
    }

    window.addEventListener('load', function(){
        FastClick.attach(document.body)
    },false)

    document.documentElement.addEventListener('touchmove',function(e){
        if(e.touches.length > 1){
            e.preventDefault()
        }
    },false)
}()
