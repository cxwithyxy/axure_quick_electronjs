import { Axure_controller } from "./Axure_controller";

let a_c = new Axure_controller()


process.on('loaded', () => {
    (<any>global).axure_controller = a_c;
})