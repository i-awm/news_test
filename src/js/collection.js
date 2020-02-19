import '../scss/collections.scss';

//每个 页面 的入口 都有 init render event

import Header from '../components/header';
import NoContentTip from '../components/no_content_tip';
import NewsItem from '../components/news_item';
import {showDom} from '../utils/tools';

let header = new Header(),
    noContentTip = new NoContentTip(),
    newsItem = new NewsItem();

const App = ($) => {
    const $app = $('#app'),
            $list = $app.children('.list'),
            collections = JSON.parse(localStorage.getItem('collections'));
    
    const init = () => {
        
        render().then(bindEvent());
    }

    const render = () => {
        return new Promise((resolve,reject)=>{
        _renderHeader();
        //_renderNoContentTip('还没有收藏');
        !collections || Object.keys(collections).length === 0
        ? _renderNoContentTip('还没有收藏')
        : _renderList(collections);
            resolve()
        })
        
    }

    const bindEvent = () => {
        $list.on('click','.news-item', toDetailPage)
    }

    const _renderHeader = () => {
        $app.append(header.tpl({
            title:'我的收藏',
            showLeftIcon: true,
            showRightIcon: false
        }))
    }

    const _renderList = () => {
        $list.append(newsItem.tpl(_arrangeData(collections)));
        showDom( $('.news-thumb'))
    }
   
    const _renderNoContentTip = (text) => {
        $app.append(noContentTip.tpl(text))
    }

    function _arrangeData(collections) {
        let _arr = [];
        Object.values(collections).forEach(item=>_arr.push(item))
        return _arr;
    }

    function toDetailPage(e){
        const $this = $(this);
        const url = $this.attr('data-url'),
              uniquekey = $this.attr('data-uniquekey');
        localStorage.setItem('target',JSON.stringify(collections[uniquekey]));

        window.location.href = `detail.html?url=${url}&uniquekey=${uniquekey}`;
    }

    init();

}

App(Zepto);

//事件委托函数
//获取标签
//

