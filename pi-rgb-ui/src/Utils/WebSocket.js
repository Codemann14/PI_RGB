import WebSocketActions from "../Actions/WebSocketActions"

// TODO: Document

/**
 * @author Cody Kurowski
 * @description This class handles the websocket
 * 
 * @class WebSocket
 */
class WebSocketUtil {
    constructor() {
        this.socket = null

        this.openWebSocket = this.openWebSocket.bind(this)
        this._onOpen = this._onOpen.bind(this)
        this._onMessage = this._onMessage.bind(this)
        this._onError = this._onError.bind(this)
        this._onClose = this._onClose.bind(this)
    }

    openWebSocket() {
        this.socket = new WebSocket("ws://192.168.1.202:9001/")

        this.socket.onopen = this._onOpen
        this.socket.onmessage = this._onMessage
        this.socket.onerror = this._onError
        this.socket.onclose = this._onClose
    }

    _onOpen() {
        WebSocketActions.opened()
    }

    _onMessage(e) {
        WebSocketActions.message(JSON.parse(e.data))
    }

    _onError() {
        WebSocketActions.connectionFailed()
    }

    _onClose() {
        WebSocketActions.connectionFailed()
    }

    send(data) {
        this.socket.send(data)
    }
}

const webSocketUtil = new WebSocketUtil()
export default webSocketUtil
