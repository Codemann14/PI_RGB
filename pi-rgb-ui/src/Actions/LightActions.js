import LightActionTypes from "../ActionTypes/LightActionTypes"
import Dispatcher from "../Dispatcher"

/**
 * @namespace Actions
 */


/**
 * @author Cody Kurowski
 * 
 * @memberOf Actions
 * @constructor 
 */
const LightActions = {

    /**
     * @author Cody Kurowski
     * @description This function handles the change of an LED.
     * 
     * 
     * @memberOf Actions.LightActions
     * @param {number} LEDPosition The position of the LED
     * @param {number} R The R color number of the LED
     * @param {number} G The G color number of the LED
     * @param {number} B The B color number of the LED
     */
    ChangeLEDColor(LEDPosition, R, G, B) {
        Dispatcher.dispatch({
            Type: LightActionTypes.CHANGE_LED_COLOR,
            Data: {
                LEDPosition,
                R,
                G,
                B,  
            },
        })
    },

    /**
     * @author Cody Kurowski
     * @description This function handles the brightness change of the LED strip.
     * The higher the number the brighter the LED strip.
     * 
     * @memberOf Actions.LightActions
     * @param {number} brightness 0-255 brightness number
     */
    ChangeStripBrightness(brightness) {
        Dispatcher.dispatch({
            Type: LightActionTypes.BRIGHTNESS_CHANGED,
            Data: brightness,
        })
    },

    /**
     * @author Cody Kurowski
     * @description This function Dispathes the CHANGED_ALL_LEDS_COLOR signal to the LightStore.
     * The store will handle changing all the LEDs.
     * 
     * @param {number} R Red Color
     * @param {number} G Green Color
     * @param {number} B Blue Color
     */
    ChangeAllLEDsColors(R, G, B) {
        Dispatcher.dispatch({
            Type: LightActionTypes.CHANGED_ALL_LEDS_COLOR,
            Data: {
                R,
                G,
                B,
            },
        })
    },
}

export default LightActions
