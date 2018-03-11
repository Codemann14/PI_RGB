import React, { Component } from "react"
import Slider from "material-ui/Slider"
import Paper from "material-ui/Paper"
import LightActions from "../Actions/LightActions"
import LightStore from "../Stores/LightsStore"

/**
 * @author Cody Kurowski
 * @description This class will handle the brightness of the LED strip.
 * 
 * @memberOf Components
 * @class BrightnessChanger
 * @extends {Component}
 */
class BrightnessChanger extends Component {
    constructor() {
        super()

        this.state = {
            brightness: LightStore.getBrightness(),
        }

        this.handleBrightnessChanged = this.handleBrightnessChanged.bind(this)
        this.handleBrightnessSliderChange = this.handleBrightnessSliderChange.bind(this)
    }

    componentWillMount() {
        LightStore.on("BRIGHTNESS_CHANGED", this.handleBrightnessChanged)
    }

    componentWillUnmount() {
        LightStore.removeListener("BRIGHTNESS_CHANGED", this.handleBrightnessChanged)
    }

    /**
     * @author Cody Kurowski
     * @description This function will set the new brightness
     * 
     * @memberof Components.BrightnessChanger
     */
    handleBrightnessChanged() {
        this.setState({
            brightness: LightStore.getBrightness(),
        })
    }

    /**
     * @author Cody Kurowski
     * @description This function is used to hander the Material-UI slider change.
     * 
     * @param {any} e Event
     * @param {number} value Value of the Slider component
     * @memberof Components.BrightnessChanger
     */
    handleBrightnessSliderChange(e, value) {
        LightActions.ChangeStripBrightness(value)
    }

    render() {
        const { brightness } = this.state

        return (
            <div>
                <Paper className="paper" zDepth={2}>
                    <h4>Brightness</h4>
                    <Slider
                        className="slider"
                        sliderStyle={{ margin: 0 }}
                        min={0}
                        max={255}
                        step={1}
                        value={brightness}
                        onChange={this.handleBrightnessSliderChange}
                    />
                </Paper>
            </div>
        )
    }
}

export default BrightnessChanger
