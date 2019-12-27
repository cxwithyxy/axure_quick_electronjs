import { Axure_controller } from "./Axure_controller";

let a_c = new Axure_controller()


process.once('loaded', () => {
    (<any>global).get_into_iframe = async function ()
    {
        await a_c.get_into_iframe()
    };
    (<any>global).main = async function ()
    {
        if(a_c.function_call_after_main_called)
        {
            await a_c.function_call_after_main_called()
        }
    }
})