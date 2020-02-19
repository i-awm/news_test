// 入口文件
import '../scss/index.scss';

import Header from '../components/header';
import Nav from '../components/nav';
import NewsItem from '../components/news_item';
import Loading from '../components/page_loading';
import BottomTip from '../components/bottom_tip';
import {
    new_type
} from '../utils/data';

import IndexModel from '../models/index';

import {
    showDom,
    scrollToBottom as bindCall
} from '../utils/tools';
// init render  render以后 绑定事件处理函数

let header = new Header(),
    nav = new Nav(),
    newsList = new NewsItem(),
    loading = new Loading(),
    bottomTip = new BottomTip();

const App = ($, win) => {

    const $app = $('#app'),
        $list = $app.children('.list');
    const $win = $(win);

    let filed = 'top',
        pageNum = 0,
        showCount = 10,
        pageCount = 0,
        dataCahe = {},
        bottomLock = false,
        newScrollToBottom = bindCall.bind(null, scrollToBottom);

    const model = new IndexModel();


    const init = () => {
        render(filed, pageNum, showCount).then(bindEvent());
    }
    // 事件 代理函数
    const bindEvent = () => {
        $('.nav .nav-wrapper').on('click', '.item', navSelect);
        $list.on('click','.news-item',toDetailPage)
    }

    const render = (filed, pageNum, showCount) => {
        return new Promise((resolve, reject) => {
            _renderHeader();
            _renderNav(new_type);
            _renderNewsList(filed, pageNum, showCount)
            resolve();
        })
    }

    const _renderHeader = () => {
        $app.append(header.tpl({
            title: '新闻头条',
            showLeftIcon: false,
            showRightIcon: true
        }));
    }

    const _renderNav = (newsType) => {
        const tpls = nav.tpl(newsType);
        $app.append(tpls.navStr);
        $('.nav .nav-wrapper').append(tpls.itemStr)
    }

    const _renderLoading = () => {
        $list.html('');
        const tpl = loading.tpl();
        $app.append(tpl);
    }

    const _renderNewsList = (filed, pageNum, showCount, type) => {

        if (dataCahe[filed]) {
            pageCount = dataCahe[filed].length;

            let timer = setTimeout(() => {
                _insertList(filed, pageNum, type);
                clearTimeout(timer);
            }, 1000)

        } else {
            _renderLoading();
            model.getNewsList(filed, showCount).then(data => {

                dataCahe[filed] = data;
                pageCount = dataCahe[filed].length;

                let timer = setTimeout(() => {
                    _insertList(filed, pageNum, type);
                    clearTimeout(timer);
                }, 1000)

            });
        }
    }

    const _insertList = (filed, pageNum, type) => {
        //console.log(pageNum);
        if (type === 'append') {
            $list.append(newsList.tpl(dataCahe[filed][pageNum], pageNum));
            _afetrRender(false)
        } else {
            $list.html(newsList.tpl(dataCahe[filed][pageNum], pageNum));
            
            $('.loading-icon').remove();
            _afetrRender(true);
        }
        bottomLock = false;
    }

    const _afetrRender = (bindEvent) => {
        bindEvent&&$win.on('scroll', newScrollToBottom);
        handleBottomTip('remove');
        showDom($('.news-thumb'));
    }

    function scrollToBottom() {
        if(!bottomLock){
            if (pageNum < pageCount - 1) {
                // if (!bottomLock) {
                    bottomLock = true;
                    handleBottomTip('append', 'loading', '正在加载中...');
                    //获取数据 添加数据 移除加载中 一次获取数据有缓存直接insert
                    _renderNewsList(filed, pageNum += 1, showCount, 'append');
                // }
            } else {
                handleBottomTip('removedAndAppend', 'final', '已经加载完了')
            }
        }
        // if (pageNum < pageCount - 1) {
        //     if (!bottomLock) {
        //         bottomLock = true;
        //         handleBottomTip('append', 'loading', '正在加载中...');
        //         //获取数据 添加数据 移除加载中 一次获取数据有缓存直接insert
        //         _renderNewsList(filed, pageNum += 1, showCount, 'append');
        //     }
        // } else {
        //     handleBottomTip('removedAndAppend', 'final', '已经加载完了')
        // }
    }

    const handleBottomTip = (how, isloading, text) => {
        switch (how) {
            case 'append':
                $app.append(bottomTip.tpl(isloading, text));
                break;
            case 'remove':
                $('.bottom-tip').remove();
                break;
            case 'removedAndAppend':
                $('.bottom-tip').remove();
                $app.append(bottomTip.tpl(isloading, text));
                break;
        }
    }

    function navSelect(e) {
        //回归第一页
        pageNum = 0;
        handleBottomTip('remove');
        $win.off('scroll', newScrollToBottom);
        //返回顶部
        win.scrollTo(0, 0);
        //把内容滚动到指定区域
        //setTimeout(()=> win.scrollTo(0,0),800);

        const $this = $(this);
        //点击  获取类型
        filed = $this.attr('data-type');
        //样式切换
        $this.addClass('current').siblings('.item').removeClass('current');

        //获取数据
        _renderNewsList(filed, pageNum, showCount);

    }

    function toDetailPage(){
        const $this = $(this),
                url = $this.attr('data-url'),
                idx =  $this.attr('data-index'),
                pageNum = $this.attr('data-pageNum');
        //可以收藏
        localStorage.setItem('target',JSON.stringify(dataCahe[filed][pageNum][idx]))
        //跳转
        window.location.href = `detail.html?url=${url}&uniquekey=${dataCahe[filed][pageNum][idx].uniquekey}`;
    }

    init();
}

App(Zepto, window);

//数据结构化
//错误处理
//上下联动 标题样式切换
//移动端 适配

//数组方法 修改原数组 push pop unshift shift splice(start,deletcount,item1,item2) sort reverse

//slice(start,endIndex) 

//subString(start,endIndex) substr(start,len)

//程序 功能单一化 职能化

// 数据结构化 数据缓存
//接口 请求处理
//数据处理 获取数据后

//入口文件 使用数据

//组件需要容器存放

//前端缓存池技术
//    localStorage sessionStorage 

//利用 bind传 callback

//数据结构化 
//HTTP网络协议