import React from "react"
import PropTypes from "prop-types"
import { ChromePicker } from "react-color"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"


/**
 * @author Cody Kurowski
 * @description This component contains the color picker tool.
 * 
 * @memberOf Components
 * @prop {object} color RGB color object
 * @prop {number} currentLED The current LED that is being changed
 * @prop {function} handleColorChange The function that will handle the color change
 * @prop {bool} colorPickerModalOpen Whether the modal is open or not
 * @prop {function} handleModalClose Function to handle closing the modal
 * @class ColorPickerModal
 */
const ColorPickerModal = ({ 
    color, 
    currentLED,
    handleColorChange, 
    colorPickerModalOpen, 
    handleModalClose,
}) => {
    const actions = [
        <FlatButton
            label="Close"
            primary={true}
            onClick={handleModalClose}
        />,
    ]

    return (
        <Dialog
            title={`Change Color of LED ${currentLED}`}
            modal={false}
            actions={actions}
            open={colorPickerModalOpen}
            onRequestClose={handleModalClose}
            contentStyle={{ width: 300, textAlign: "center" }}
        >

            <div className="color-picker">
                <ChromePicker disableAlpha={true} color={color} onChangeComplete={handleColorChange} />
            </div>
            
        </Dialog>  
    )        
}


ColorPickerModal.propTypes = {
    color: PropTypes.object, 
    currentLED: PropTypes.number,
    handleColorChange: PropTypes.func, 
    colorPickerModalOpen: PropTypes.bool, 
    handleModalClose: PropTypes.func,
}

ColorPickerModal.defaultProps = {
    color: { }, 
    currentLED: 0,
    handleColorChange: () => {}, 
    colorPickerModalOpen: false, 
    handleModalClose: () => {},
}

export default ColorPickerModal
