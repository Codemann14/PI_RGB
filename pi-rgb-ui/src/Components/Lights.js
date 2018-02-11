import React, { Component } from "react"
import { ChromePicker } from "react-color"

import LightStore from "../Stores/LightsStore"

// TODO: temp
import WebSocket from "../Utils/WebSocket"


/**
 * @namespace Components
 */


/**
 * @author Cody Kurowski
 * @enum {number}
 * @memberOf Components.Lights
 */
const LEDEnum = {
    /** Radius of LED circle */
    RADIUS: 20,
    /** X Distance from center of one LED circle to the next */
    DISTANCEBETWEENXPOS: 50,
    /** X Distance from center of one LED circle to the next */
    DISTANCEBETWEENYPOS: 50,
    /** X Positsion of the first LED circle */
    XPOSSTART: 30,
    /** Y Positsion of the first LED circle */
    YPOSSTART: 30,
}


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
            lightsArr: LightStore.getLights(),
            width: 0,
            height: 0,
        }

        this.getCanvasHeight = this.getCanvasHeight.bind(this)
        this.handleColorChange = this.handleColorChange.bind(this)
        this.handleLightsChanged = this.handleLightsChanged.bind(this)
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.updateCanvas = this.updateCanvas.bind(this)
        this.makeLED = this.makeLED.bind(this)
    }

    componentWillMount() {
        window.addEventListener("resize", this.updateWindowDimensions)
        LightStore.on("LIGHTS_CHANGED", this.handleLightsChanged)
    }

    componentDidMount() {
        // TODO: Move this tho somewhere else
        WebSocket.openWebSocket()

        this.updateWindowDimensions()
        this.updateCanvas()
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions)
        LightStore.removeListener("LIGHTS_CHANGED", this.handleLightsChanged)
    }

    /**
     * @author Cody Kurowski
     * @description This function calculates the proper height of the canvas.
     * 
     * @returns {number} Height of canvas
     * @memberof Components.Lights
     */
    getCanvasHeight() {
        const numberOfLEDsPerRow = Math.floor(this.state.width / LEDEnum.DISTANCEBETWEENXPOS)
        const numberOfRows = Math.ceil(this.state.lightsArr.length / numberOfLEDsPerRow)
        const height = ((numberOfRows - 1) * LEDEnum.DISTANCEBETWEENYPOS) + (LEDEnum.YPOSSTART * 2)
        return height
    }

    handleColorChange(color) {
        console.log(color.rgb)
    }

    handleLightsChanged() {
        // TODO: Stuff
    }

    /**
     * @author Cody Kurowski
     * @description This function is called when the browser window is resized.
     * This function will reset the width and height state to the current demensions.
     * When called this will re-draw the canvas.
     * 
     * @memberof Components.Lights
     */
    updateWindowDimensions() {
        this.setState({ 
            width: window.innerWidth, 
        }, () => {
            this.setState({
                height: this.getCanvasHeight(),
            }, () => {
                this.updateCanvas()
            })
        })
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

        // Init starting positions
        let xPos = LEDEnum.XPOSSTART
        let yPos = LEDEnum.YPOSSTART

        // Make multiple LEDs
        this.state.lightsArr.forEach((LED) => {
            // Make color
            const color = `rgba(${LED.R}, ${LED.G}, ${LED.B}, 1)`

            this.makeLED(ctx, xPos, yPos, LEDEnum.RADIUS, color)

            // Check to see if the next one will be rendered outside the canvas
            const checkXPos = xPos + LEDEnum.DISTANCEBETWEENXPOS + (LEDEnum.XPOSSTART)
            if (checkXPos >= this.state.width) {
                // Go down to the next line and set XPos back to start
                yPos += LEDEnum.DISTANCEBETWEENYPOS 
                xPos = LEDEnum.XPOSSTART
            } else {
                xPos += LEDEnum.DISTANCEBETWEENXPOS
            }  
        })   
    }

    /**
     * @author Cody Kurowski
     * @description This function draws each individual LED light 
     * 
     * @param {object} ctx Canvas Object
     * @param {number} XPos X position of center of the circle
     * @param {number} YPos Y position of center of the circle
     * @param {number} radius Radius of the circle
     * @param {string} color Color of the circle
     * @memberof Components.Lights
     */
    makeLED(ctx, XPos, YPos, radius, color) {
        ctx.beginPath()
        ctx.shadowBlur = 10
        ctx.shadowColor = color
        ctx.arc(XPos, YPos, radius, 0, 2 * Math.PI)
        ctx.fillStyle = color
        ctx.fill()
        ctx.strokeStyle = color
        ctx.stroke()
    }

    render() {
        const { width, height } = this.state

        return (
            <div className="text-center">
                <canvas ref={(canvas) => { this.canvas = canvas }} width={width} height={height} />
                <ChromePicker disableAlpha={true} onChangeComplete={this.handleColorChange} />
            </div>
        )
    }
}

export default Lights
