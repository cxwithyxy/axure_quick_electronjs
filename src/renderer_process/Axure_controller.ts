import { remote } from "electron";
import _ from "lodash";
interface Axure_controller_sub_process_functions_interface
{
    [propName: string]: Function;
}
interface Axure_global extends NodeJS.Global{
    Axure_controller_sub_process_functions: Axure_controller_sub_process_functions_interface
}
export class Axure_controller
{
    function_call_after_main_called?: Function
    
    constructor()
    {
        this.axure_preload()
    }

    on_sub_process_loaded()
    {
        let funcs:Axure_controller_sub_process_functions_interface = {};
        funcs.get_into_iframe = async () =>
        {
            await this.get_into_iframe()
        };
        funcs.main = async () =>
        {
            if(this.function_call_after_main_called)
            {
                await this.function_call_after_main_called()
            }
        };
        (<Axure_global>global).Axure_controller_sub_process_functions = funcs

    }
    
    axure_preload()
    {
        let preload_js_path = _.find(process.argv, (o) =>
        {
            return _.startsWith(o,"axure_preload:")
        })
        preload_js_path = _.split(<string>preload_js_path, "axure_preload:", 2)[1]
        if(preload_js_path)
        {
            this.function_call_after_main_called = require(preload_js_path).default
        }
    }

    async get_into_iframe()
    {
        return new Promise(succ =>
        {
            let tthl = setInterval(() => 
            {
                let iframe,iframe_src
                try
                {
                    iframe = <HTMLIFrameElement>document.querySelectorAll("iframe")[0]
                    iframe_src = (<Window>iframe.contentWindow).location.href
                }catch(e){}

                if(iframe_src)
                {
                    clearInterval(tthl)
                    window.location.href = iframe_src
                    succ()
                }
            }, 83)
        })
    }
}