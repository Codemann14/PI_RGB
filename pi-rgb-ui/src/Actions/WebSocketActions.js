import Dispatcher from "../Dispatcher"
import LightActionTypes from "../ActionTypes/LightActionTypes"
import WebSocketActionTypes from "../ActionTypes/WebSocketActionTypes"
import WebSocketUtil from "../Utils/WebSocket"

/**
 * @author Cody Kurowski
 * @description This member communicates with the WebSocket and the Flux Store
 * 
 * @memberOf Actions
 * @constructor 
 */
const WebSocketActions = {

    /**
     * @author Cody Kurowski
     * @description This is called when the Web Socket fails for any reason
     * 
     * @memberOf Actions.WebSocketActions
     */
    connectionFailed() {
        Dispatcher.dispatch({
            Type: WebSocketActionTypes.WEBSOCKET_CONNECTION_FAILED,
        })
    },

    /**
     * @author Cody Kurowski
     * @description This is called to send data to the server. 
     * 
     * @memberOf Actions.WebSocketActions
     * @param {object} data Data to send to the server
     */
    send(data) {
        if (process.env.NODE_ENV !== "test") {
            WebSocketUtil.send(JSON.stringify(data))
        }        
    },

    /**
     * @author Cody Kurowski
     * @description This is called to open the WebSocket
     * 
     * @memberOf Actions.WebSocketActions
     */
    open() {
        WebSocketUtil.openWebSocket()
    },

    /**
     * @author Cody Kurowski
     * @description This is called when the Web Socket opens sucessfully
     * 
     * @memberOf Actions.WebSocketActions
     */
    opened() {
        Dispatcher.dispatch({
            Type: WebSocketActionTypes.WEBSOCKET_CONNECTION_OPENED,
        }) 
    },

    /**
     * @author Cody Kurowski
     * @description This is called when the server sends a message to the UI.
     * This data is Dispatched to the Flux Store
     * 
     * @memberOf Actions.WebSocketActions
     * @param {array} obj Object the server sends contating LED data
     */
    message(obj) {
        Dispatcher.dispatch({
            Type: LightActionTypes.RECIEVED_LEDS,
            Data: obj,
        })
    },

}

export default WebSocketActions
