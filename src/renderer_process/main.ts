import { Axure_controller } from "./Axure_controller";

let a_c = new Axure_controller()


process.once('loaded', () => {
    a_c.on_sub_process_loaded()
})