import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";
import _ from "lodash";

interface Axure_window_options extends BrowserWindowConstructorOptions
{
    axure_preload?: string
}

export class Axure_window extends BrowserWindow
{

    global_name_list:string[]

    add_axure_global(name_in_global: string, everything_you_want: any)
    {
        this.global_name_list.push(name_in_global);
        (<any>global)[name_in_global] = everything_you_want;
    }

    constructor (options?: Axure_window_options | undefined)
    {
        let axure_preload
        if(!options)
        {
            options = {}
        }
        if(options?.axure_preload)
        {
            axure_preload = `axure_preload:${options.axure_preload}`
        }
        _.merge(options, {
            webPreferences: {
                preload: `${__dirname}/../renderer_process/main.js`,
                additionalArguments: [axure_preload]
            }
        })
        super(options);
        this.global_name_list = []
    }

    async load_start_url(url: string): Promise<void>
    {
        await this.loadURL(url)
        this.webContents.on("did-finish-load", async () =>
        {
            await this.webContents.executeJavaScript(`axure_controller.init_global(${JSON.stringify(this.global_name_list)})`)
            await this.webContents.executeJavaScript(`axure_controller.main()`)
        })
        await this.webContents.executeJavaScript(`axure_controller.get_into_iframe()`)
    }
}
