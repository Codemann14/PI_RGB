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
        this.brightness = 255
    }

    getBrightness() {
        return this.brightness
    }

    getLights() {
        return this.lights
    }

    _updateLEDStrip() {
        // Send the new data to the server through the Websocket
        WebSocketActions.send({
            Data: {
                LEDs: this.lights,
                Brightness: this.brightness,
            },
        })
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

            this._updateLEDStrip()

            this.emit("LIGHTS_CHANGED")
            break
        case LightActionTypes.RECIEVED_LEDS:
            this.lights = action.Data.LEDs
            this.brightness = action.Data.Brightness
            this.emit("LIGHTS_CHANGED")
            break
        case LightActionTypes.BRIGHTNESS_CHANGED:
            this.brightness = action.Data
            this._updateLEDStrip()
            this.emit("BRIGHTNESS_CHANGED")
            break
        case LightActionTypes.CHANGED_ALL_LEDS_COLOR:            
            this.lights = this.lights.map(LED => 
                ({
                    LEDPosition: LED.LEDPosition,
                    R: action.Data.R,
                    B: action.Data.B,
                    G: action.Data.G, 
                }))

            this._updateLEDStrip()
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
