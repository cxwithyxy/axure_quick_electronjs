import { Axure_controller } from "./Axure_controller";
import _ from "lodash";

class Main_controller
{

    constructor()
    {
        this.axure_preload()
    }

    axure_preload()
    {
        let preload_js_path = _.find(process.argv, (o) =>
        {
            return _.startsWith(o,"axure_preload:")
        })
        preload_js_path = _.split(<string>preload_js_path, "axure_preload:", 2)[1]
        require(preload_js_path)
    }
}

new Main_controller()


process.once('loaded', () => {
    (<any>global).main = async function ()
    {
        let a_c = new Axure_controller()
        
        // await a_c.get_into_iframe()
        
    }
})