import { Axure_controller } from "./Axure_controller";

process.once('loaded', () => {
    (<any>global).main = async function ()
    {
        let a_c = new Axure_controller()
        await a_c.get_into_iframe()
    }
})