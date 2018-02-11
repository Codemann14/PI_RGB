import { EventEmitter } from "events" 
import Dispatcher from "../Dispatcher"

// TODO: TEMP
import Mocklights from "../Components/MockLights"

/**
 * @namespace Stores
 */

/**
 * @author Cody Kurowski
 * @description This store is the store that will hold the LED lights data
 * 
 * @memberOf Stores
 * @class LightStore
 * @extends {EventEmitter}
 */
class LightStore extends EventEmitter {
    constructor() {
        super()

        this.lights = Mocklights.Data
    }

    getLights() {
        return this.lights
    }

    handleActions(action) {
        switch (action.Type) {
        default:
            break
        }
    }
}

const lightStore = new LightStore()
Dispatcher.register(lightStore.handleActions.bind(lightStore))
export default lightStore
