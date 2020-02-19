import tpl from './index.tpl'
import './index.scss';
import {tplReplace} from '../../utils/tools';

export default () => {
    return {
        name:'bottomTip',
        tpl(isLoading,text){
            return tpl().replace(tplReplace(),(str,expr)=>{
                return {
                    isLoading,
                    text
                }[expr]
            })
        }
    }
}