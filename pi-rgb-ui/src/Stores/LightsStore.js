import { EventEmitter } from "events" 
import Dispatcher from "../Dispatcher"
import LightActionTypes from "../ActionTypes/LightActionTypes"

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
        case LightActionTypes.CHANGE_LED_COLOR: 
            this.lights[action.Data.LEDPosition - 1] = {
                LEDPosition: action.Data.LEDPosition,
                R: action.Data.R,
                B: action.Data.B,
                G: action.Data.G,
            }
            this.emit("LIGHTS_CHANGED")
            break
        default:
            break
        }
    }
}

const lightStore = new LightStore()
Dispatcher.register(lightStore.handleActions.bind(lightStore))
export default lightStore
