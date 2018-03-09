import { EventEmitter } from "events" 
import Dispatcher from "../Dispatcher"
import LightActionTypes from "../ActionTypes/LightActionTypes"
import WebSocketActions from "../Actions/WebSocketActions"


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

        this.lights = []
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

            // Send the new data to the server through the Websocket
            WebSocketActions.send({
                Data: {
                    LEDs: this.lights,
                    Brightness: 255, // TODO: Allow changing
                },
            })

            this.emit("LIGHTS_CHANGED")
            break
        case LightActionTypes.RECIEVED_LEDS:
            this.lights = action.Data.LEDs
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
