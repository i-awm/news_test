import tpl from "./index.tpl";
import './index.scss';
import {tplReplace} from '../../utils/tools';
export default () => {
    return {
        name:'newsFrame',
        tpl(url){
            return tpl().replace(tplReplace(),(str,expr)=>{
                return {
                    url
                }[expr];
            })
        }
    }
}