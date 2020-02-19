import '../scss/detail.scss';
import Header from '../components/header';
import NewsFrame from '../components/news_frame';
import Collector from '../components/collector';
//每个入口 都有 init render event
import {getUrl} from '../utils/tools';


let header = new Header();
const newsFrame = new NewsFrame(),
      collector = new Collector();

const App = ($) => {
    const $app = $('#app'),
          $frame = $app.children('.frame-wrapper'),
          target = JSON.parse(localStorage.getItem('target')),
          newsUrl = getUrl('url')||target[url],
          uniquekey = getUrl('uniquekey')||target[uniquekey];

          //请求API数据 查看是否收藏
            //colections 是否存在 如果存在比较 uniquekey
    let collections = JSON.parse(localStorage.getItem('collections')) || {},
        collected = Boolean(collections[uniquekey]);

    const init = () => {
        render().then(bindEvent());
    }

    const render = () => {
        return new Promise((resolve,reject)=>{
            _renderHeader();
            _renderFrame();
            _renderCollector(collected);
            resolve();
        })  
    }

    const bindEvent = () => {
        $('.collector').on('click', newsCollected)
    }

    const _renderHeader = () => {
        $app.append(header.tpl({
            title:'新闻详情',
            showLeftIcon:true,
            showRightIcon:false
        }))
    }

    const _renderFrame = () => {
        $frame.append(newsFrame.tpl(newsUrl));
    }

    const _renderCollector = (isCollected) => {
        $app.append(collector.tpl(isCollected));
    }

    function newsCollected(e){
        //提交服务器
        if(collections[uniquekey]){
            delete collections[uniquekey];
            collected = false;
        }else{
            collections[uniquekey] = JSON.parse(localStorage.getItem('target'));
            collected = true;
        }
        localStorage.setItem('collections',JSON.stringify(collections));
        collector.changeCollector(collected);
    }

    init();
}

App(Zepto);


// 模板 组件 数据渲染模板 tpl() 字符串函数 样式 
