import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";
import _ from "lodash";

export class Axure_window extends BrowserWindow
{
    constructor (options?: BrowserWindowConstructorOptions | undefined)
    {
        if(!options)
        {
            options = {}
        }
        _.merge(options, {
            webPreferences: {
                preload: `${__dirname}/../../build/renderer_process/main.js`
            }
        })
        super(options);
    }

    async load_start_url(url: string): Promise<void>
    {
        await this.loadURL(url)
        await this.webContents.executeJavaScript(`main()`)
    }
}