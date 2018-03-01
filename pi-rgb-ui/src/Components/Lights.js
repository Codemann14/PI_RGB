import React, { Component } from "react"
import { ChromePicker } from "react-color"
import ColorPickerModal from "./ColorPickerModal"
import LightActions from "../Actions/LightActions"
import LightStore from "../Stores/LightsStore"

// TODO: Color Picker in Modal and Close it

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
    /** Line width of LED border */
    LINEWIDTH: 5,
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
            lightsObjArr: [], // Holds the LED objects
            width: window.innerWidth, // Canvas width 
            height: 0, // Canvas height
            colorPickerOpen: false, // Whether the color picker is shown or not
            colorPickerColor: { r: 51, g: 51, b: 51 }, // Holds current color of Chrome Color Picker
            currentLEDClicked: null, // Holds the last LED that was clicked on, used to change specific LEDs color
            LEDHovered: false, // Whether to display a cursor or not
        }

        this.getCanvasHeight = this.getCanvasHeight.bind(this)
        this.handleCanvasClick = this.handleCanvasClick.bind(this)
        this.handleCanvasHover = this.handleCanvasHover.bind(this)
        this.handleColorChange = this.handleColorChange.bind(this)
        this.handleLightsChanged = this.handleLightsChanged.bind(this)
        this.isIntersect = this.isIntersect.bind(this)
        this.makeLED = this.makeLED.bind(this)
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.updateCanvas = this.updateCanvas.bind(this)
    }

    componentWillMount() {
        window.addEventListener("resize", this.updateWindowDimensions)
        LightStore.on("LIGHTS_CHANGED", this.handleLightsChanged)
    }

    componentDidMount() {
        this.updateWindowDimensions()
        this.handleLightsChanged()        
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions)
        LightStore.removeListener("LIGHTS_CHANGED", this.handleLightsChanged)
    }

    /**
     * @author Cody Kurowski
     * @description This function calculates the proper height of the canvas.
     * 
     * @param {number} width Width of page currently
     * @param {array} lightsObjArr LED array
     * @returns {number} Height of canvas
     * @memberof Components.Lights
     */
    getCanvasHeight(width, lightsObjArr) {
        const numberOfLEDsPerRow = Math.floor(width / LEDEnum.DISTANCEBETWEENXPOS)
        const numberOfRows = Math.ceil(lightsObjArr.length / numberOfLEDsPerRow)
        const height = ((numberOfRows - 1) * LEDEnum.DISTANCEBETWEENYPOS) + (LEDEnum.YPOSSTART * 2)
        return height
    }

    /**
     * @author Cody Kurowski
     * @description This function handles a canvas click.
     * 
     * @param {any} e click event
     * @memberof Components.Lights
     */
    handleCanvasClick(e) {
        // Get mouse position
        const clickPos = {
            x: e.clientX,
            y: e.clientY,
        }

        this.state.lightsObjArr.forEach((circle) => {
            if (this.isIntersect(clickPos, circle)) {
                // Open color picker and set this.state.currentLEDClicked
                this.setState({
                    colorPickerOpen: true,
                    currentLEDClicked: circle.id,
                })
            }
        })
    }
    
    /**
     * @author Cody Kurowski
     * @description This function handles a canvas hover.
     * 
     * @param {any} e hover event
     * @memberof Components.Lights
     */
    handleCanvasHover(e) {
        // Get mouse position
        const hoverPos = {
            x: e.clientX,
            y: e.clientY,
        }

        this.state.lightsObjArr.forEach((circle) => {
            if (this.isIntersect(hoverPos, circle)) {
                this.setState({ LEDHovered: true })
            }
        })
    }

    /**
     * @author Cody Kurowski
     * @description This function handles when the color picker changes a LEDs color
     * 
     * @param {objest} color 
     * @memberof Components.Lights
     */
    handleColorChange(color) {
        this.setState({ colorPickerColor: color })
        LightActions.ChangeLEDColor(this.state.currentLEDClicked, color.rgb.r, color.rgb.g, color.rgb.b)
    }

    /**
     * @author Cody Kurowski
     * @description This function will get the lights from the LightStore.
     * It then loops through those objects and figures out where each LED should be placed on canvas.
     * After it is done figuring that out it sets the state to the new LED array.
     * 
     * @memberof Components.Lights
     */
    handleLightsChanged() {
        const ctx = this.canvas.getContext("2d")
        const lightsArr = LightStore.getLights()
        const lightsObjArr = []

        // Init starting positions
        let xPos = LEDEnum.XPOSSTART
        let yPos = LEDEnum.YPOSSTART

        // Make multiple LED objects
        lightsArr.forEach((LED) => {
            // Build LEDlight object
            lightsObjArr.push({
                id: LED.LEDPosition,
                x: xPos,
                y: yPos,
                yOffsetTop: yPos + ctx.canvas.offsetTop, // Canvas Distance from top of the page
                radius: LEDEnum.RADIUS,
                color: {
                    r: LED.R,
                    g: LED.G,
                    b: LED.B,
                },
            })

            // Check to see if the next one will be rendered outside the canvas
            const checkXPos = xPos + LEDEnum.DISTANCEBETWEENXPOS + LEDEnum.XPOSSTART
            if (checkXPos >= this.state.width) {
                // Go down to the next line and set XPos back to start
                yPos += LEDEnum.DISTANCEBETWEENYPOS 
                xPos = LEDEnum.XPOSSTART
            } else {
                xPos += LEDEnum.DISTANCEBETWEENXPOS
            }  
        })

        this.setState({ lightsObjArr }, 
            () => {
                this.updateCanvas()
            },
        )        
    }

    /**
     * @author Cody Kurowski
     * @description This function checks which circle was clicked
     * 
     * @tutorial https://blog.lavrton.com/hit-region-detection-for-html5-canvas-and-how-to-listen-to-click-events-on-canvas-shapes-815034d7e9f8
     * @param {object} point Point of canvas clicked
     * @param {object} circle Circle object
     * @returns {boolean} Whether that arc was clicked or not
     * @memberof Lights
     */
    isIntersect(point, circle) {
        return Math.sqrt(((point.x - circle.x) ** 2) + ((point.y - circle.yOffsetTop) ** 2)) < circle.radius
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
        ctx.strokeStyle = color
        ctx.fillStyle = color
        ctx.lineWidth = LEDEnum.LINEWIDTH          
        ctx.beginPath()  
        ctx.arc(XPos, YPos, radius, 0, 2 * Math.PI)        
        ctx.fill()   
        ctx.stroke()        
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
                height: this.getCanvasHeight(this.state.width, this.state.lightsObjArr),
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

        // Make multiple LEDs
        this.state.lightsObjArr.forEach((LED) => {
            // Make color
            const color = `rgba(${LED.color.r}, ${LED.color.g}, ${LED.color.b}, 1)`

            this.makeLED(ctx, LED.x, LED.y, LED.radius, color)
        })   
    }

    render() {
        const { 
            width, 
            height, 
            colorPickerOpen, 
            colorPickerColor, 
            LEDHovered,
        } = this.state

        return (
            <div className="text-center">
                <canvas ref={(canvas) => { this.canvas = canvas }} width={width} height={height} style={{ cursor: LEDHovered ? "pointer" : "auto" }} onClick={(e) => { this.handleCanvasClick(e) }} onMouseMove={(e) => { this.handleCanvasHover(e) }} />
                {
                    colorPickerOpen && <ChromePicker disableAlpha={true} color={colorPickerColor} onChangeComplete={this.handleColorChange} />
                }
                <ColorPickerModal />
            </div>
        )
    }
}

export default Lights
