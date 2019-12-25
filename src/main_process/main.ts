import { app, BrowserWindow } from "electron";

app.on("ready", async () => 
{
    let b = new BrowserWindow({
        webPreferences: {
            preload: `${__dirname}/../../build/renderer_process/main.js`
        }
    })
    b.maximize()
    await b.loadURL("http://127.0.0.1:32767/start.html")
    b.webContents.openDevTools()
    await b.webContents.executeJavaScript(`main()`)
})