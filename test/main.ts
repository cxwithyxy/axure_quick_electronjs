import { app } from "electron";
import { Axure_window } from "../src/main_process/Axure_window";
import { Main_a } from "./main_process_class";

app.on("ready", async () => 
{
    // process.env
    // let b = new Axure_window({
    //     axure_preload: `${__dirname}/./inject_test.js`
    // })
    let t_m_a = new Main_a();
    let b = new Axure_window()
    b.add_axure_global("t_m_a", t_m_a)
    b.add_axure_global("aaa", {aaa: () => {return 123123}})
    b.add_axure_global("mainasd", () => {console.log("main process asdasdasdas")})
    b.maximize()
    b.webContents.openDevTools()
    await b.load_start_url("http://127.0.0.1:32767/start.html")
})