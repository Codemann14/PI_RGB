import { EventEmitter } from "events" 
import Dispatcher from "../Dispatcher"
import WebSocketActionTypes from "../ActionTypes/WebSocketActionTypes"


/**
 * @namespace Stores
 */

/**
 * @author Cody Kurowski
 * @description This store is the store that will hold the websocket connection data
 * 
 * @memberOf Stores
 * @class WebSocketStore
 * @extends {EventEmitter}
 */
class WebSocketStore extends EventEmitter {
    constructor() {
        super()

        this.websocketConnected = false
    }

    getWebSocketConnection() {
        return this.websocketConnected
    }

    handleActions(action) {
        switch (action.Type) {
        case WebSocketActionTypes.WEBSOCKET_CONNECTION_FAILED:
            this.websocketConnected = false
            this.emit("websocket-connection-changed")
            break
        case WebSocketActionTypes.WEBSOCKET_CONNECTION_OPENED:
            this.websocketConnected = true
            this.emit("websocket-connection-changed")
            break
        default:
            break
        }
    }
}

const webSocketStore = new WebSocketStore()
Dispatcher.register(webSocketStore.handleActions.bind(webSocketStore))
export default webSocketStore
