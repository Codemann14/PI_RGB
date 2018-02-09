import React, { Component } from "react"
import WebSocket from "../Utils/WebSocket";

/**
 * @namespace Components
 */


/**
 * @author Cody Kurowski
 * @description This component handles all the canvas work for the lights.
 * 
 * @memberOf Components
 * @class Lights
 * @extends {Component}
 */
class Lights extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
        WebSocket.openWebSocket()
        this.updateCanvas()
    }

    /**
     * @author Cody Kurowski
     * @description This function is ran when the component mounts. 
     * It is the function that builds the canvas.
     * 
     * @memberof Components.Lights
     */
    updateCanvas() {
        const ctx = this.canvas.getContext("2d")
        ctx.beginPath()
        ctx.arc(95, 50, 40, 0, 2 * Math.PI)
        ctx.stroke()
    }

    render() {
        return (
            <canvas ref={(canvas) => { this.canvas = canvas }} width={600} height={600} />
        )
    }
}

export default Lights
