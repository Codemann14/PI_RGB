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
     * @description This function handles the change of an LED
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
}

export default LightActions
