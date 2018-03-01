import React from "react"
import Dialog from "material-ui/Dialog"

// TODO: Document
// TODO: Add proptypes
// TODO: Add LED Number
// TODO: Add Action Buttons

const ColorPickerModal = ({ color, handleColorChange }) => (

    <Dialog
        title="Change LED Color"
        modal={false}
        open={true}
        onRequestClose={this.handleClose}
        contentStyle={{ width: 400 }}
    >
        The actions in this window were passed in as an array of React objects.
    </Dialog>       
)

export default ColorPickerModal
