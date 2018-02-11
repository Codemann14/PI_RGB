import React from "react"
import ReactDOM from "react-dom"
import "./Styles/CSS/lib/bootstrap.min.css"
import "./Styles/CSS/index.css"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"

ReactDOM.render(<App />, document.getElementById("root"))
registerServiceWorker()
