import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";
import _ from "lodash";

interface Axure_window_options extends BrowserWindowConstructorOptions
{
    axure_preload?: string
}

export class Axure_window extends BrowserWindow
{
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
    }

    async load_start_url(url: string): Promise<void>
    {
        await this.loadURL(url)
        this.webContents.once("did-finish-load", async () =>
        {
            await this.webContents.executeJavaScript(`Axure_controller_sub_process_functions.main()`)
        })
        await this.webContents.executeJavaScript(`Axure_controller_sub_process_functions.get_into_iframe()`)
    }
}
