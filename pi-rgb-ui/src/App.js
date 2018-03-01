import React from "react"
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import Home from "./Pages/Home"
import "./Styles/CSS/index.css"

const App = () => (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Home />
    </MuiThemeProvider>
)

export default App
