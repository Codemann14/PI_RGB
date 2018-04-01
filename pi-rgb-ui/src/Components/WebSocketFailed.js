import React from "react"
import Dialog from "material-ui/Dialog"


/**
 * @author Cody Kurowski
 * @description This component will only show if the Web Socket connection fails.
 * It only contains a failure message.
 * 
 * @memberOf Components
 * @class WebSocketFailed
 */
const WebSocketFailed = () => (
    <Dialog 
        modal={true}
        open={true}
    >
        <h1 className="text-center">Web Socket Connection Failed</h1>
    </Dialog>
)

export default WebSocketFailed
