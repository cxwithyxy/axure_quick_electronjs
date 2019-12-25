export class Axure_controller
{
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