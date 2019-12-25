export class Axure_controller{
    get_into_iframe()
    {
        let iframe = <HTMLIFrameElement>document.querySelectorAll("iframe")[0]
        window.location.href = (<Window>iframe.contentWindow).location.href
    }
}