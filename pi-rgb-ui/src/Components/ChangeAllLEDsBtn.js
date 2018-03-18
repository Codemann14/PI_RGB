import React, { Component } from "react"
import RaisedButton from "material-ui/RaisedButton"

import LightActions from "../Actions/LightActions"
import ColorPickerModal from "./ColorPickerModal"


/**
 * @author Cody Kurowski
 * @description This class will handle changing all the LEDs color
 * 
 * @memberOf Components
 * @class ChangeAllLEDsBtn
 * @extends {Component}
 */
class ChangeAllLEDsBtn extends Component {
    constructor() {
        super()

        this.state = {
            colorPickerModalShown: false,
            colorPickerColor: null,
        }

        this.handleColorChange = this.handleColorChange.bind(this)
        this.handleColorPickerModalShown = this.handleColorPickerModalShown.bind(this)
    }

    /**
     * @author Cody Kurowski
     * @description This function will fire the action to change all the LEDs color's
     * 
     * @param {object} color The object the comes back from the color picker
     * @memberof Components.ChangeAllLEDsBtn
     */
    handleColorChange(color) {
        this.setState({ colorPickerColor: { r: color.rgb.r, g: color.rgb.g, b: color.rgb.b } })
        LightActions.ChangeAllLEDsColors(color.rgb.r, color.rgb.g, color.rgb.b)
    }

    /**
     * @author Cody Kurowski
     * @description This function will open and close the color picker modal
     * 
     * @param {bool} shown Whether to show the color picker modal or not
     * @memberof Components.ChangeAllLEDsBtn
     */
    handleColorPickerModalShown(shown) {
        this.setState({ colorPickerModalShown: shown })
    }

    render() {
        const { colorPickerColor, colorPickerModalShown } = this.state

        return (
            <div>
                <RaisedButton 
                    label="Change All"
                    primary={true}
                    onClick={() => this.handleColorPickerModalShown(true)}
                />

                <ColorPickerModal 
                    currentLED={0} 
                    colorPickerModalOpen={colorPickerModalShown} 
                    color={colorPickerColor} 
                    handleColorChange={this.handleColorChange} 
                    handleModalClose={() => this.handleColorPickerModalShown(false)}
                />
            </div>
        )
    }
}

export default ChangeAllLEDsBtn
