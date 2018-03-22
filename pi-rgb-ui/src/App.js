import React, { Component } from "react"
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import Home from "./Pages/Home"
import WebSocketActions from "./Actions/WebSocketActions"
import "./Styles/CSS/index.css"
import "./Styles/CSS/responsiveGrid.css"

class App extends Component {
    componentDidMount() {
        WebSocketActions.open()
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <Home />
            </MuiThemeProvider>
        )
    }
}

export default App
