import tpl from './index.tpl';
import './index.scss';
import {tplReplace} from '../../utils/tools';

export default () => {
    return {
        name:'collector',
        tpl(collected){
            return tpl().replace(tplReplace(),collected?'full':'o')
        },
        changeCollector(collected){
            $('.collector').removeClass(collected ? 'o':'full').addClass(collected ? 'full':'o')
        }
    }
}