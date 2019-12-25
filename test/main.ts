import { app } from "electron";
import { Axure_window } from "../src/main_process/Axure_window";

app.on("ready", async () => 
{
    let b = new Axure_window()
    b.maximize()
    b.webContents.openDevTools()
    await b.load_start_url("http://127.0.0.1:32767/start.html")
})