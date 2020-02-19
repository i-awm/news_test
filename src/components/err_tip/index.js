import tpl from './index.tpl';
import './index.scss';
import {tplReplace} from '../../utils/tools';
export default () => {
    return {
        name:'errTip',
        tpl(text){
            return tpl().replace(tplReplace(),text)
        }
    }
}