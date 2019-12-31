import { remote } from "electron";
import _ from "lodash";

export class Axure_controller
{
    function_call_after_main_called?: Function
    
    constructor()
    {
        this.axure_preload()
    }

    async main ()
    {
        if(this.function_call_after_main_called)
        {
            await this.function_call_after_main_called()
        }
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